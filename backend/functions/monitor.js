import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { successMessage } from "../utils";

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
  const currentDate = new Date().toISOString().split("T")[0];
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
  const parsedDate = new Date(availablenickdate).toISOString().split("T")[0];
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
