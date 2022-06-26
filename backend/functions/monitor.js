import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { formatDate, getTomorrowDate, successMessage } from "../utils";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

const db = new Kysely({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      database: process.env.DATABASE,
      secretArn: process.env.SECRET_ARN,
      resourceArn: process.env.CLUSTER_ARN,
      client: new RDSDataService(),
    },
  }),
});

export const getMonitors = async (event) => {
  const record = await db.selectFrom("monitor").selectAll().execute();
  return successMessage(record);
};

export const getDailyMonitors = async (event) => {
  const currentDate = formatDate(getTomorrowDate());
  console.log(currentDate);
  const monitors = await db
    .selectFrom("monitor")
    .select(["name", "nickname", "email"])
    .where("availablenickdate", "=", currentDate)
    .execute();
  return successMessage(monitors);
};

// { "email": "louise@zetaverse.dev", "name": "louise", "nickname": "lssssssss", "availablenickdate": "2022-08-31" }
export const createMonitor = async (event) => {
  const { name, email, nickname, availablenickdate } = JSON.parse(event.body);
  const parsedDate = formatDate(new Date(availablenickdate));
  await db
    .insertInto("monitor")
    .values({
      name,
      email,
      nickname,
      availablenickdate: parsedDate,
    })
    .execute();
  return successMessage(null, 201);
};

export const sendDailyMonitors = async (event) => {
  const monitors = await getDailyMonitors();
  const bodyParsed = JSON.parse(monitors.body);
  const sendCommands = bodyParsed.map((i) => {
    const command = new SendEmailCommand({
      Source: "louise@zetaverse.dev",
      Destination: {
        ToAddresses: [i.email],
      },
      Message: {
        Subject: {
          Data: "Eternal Names team - Your nickname will be available soon!",
        },
        Body: {
          Text: {
            Data: `Hello ${i.name}, the nickname ${i.nickname} will be available tomorrow`,
          },
        },
      },
    });
    return command;
  });
  await Promise.all(sendCommands.map((command) => sesClient.send(command)));

  return monitors;
};

// [{"name":"Louise","nickname":"rio","email":"louiseebss+test6@gmail.com"}]
