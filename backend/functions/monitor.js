import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";

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
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: record,
  };
};

export const getDailyMonitors = async (event) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const monitors = await db
    .selectFrom("monitor")
    .select(["name", "nickname", "email"])
    .where("availablenickdate", "=", currentDate)
    .execute();

  return {
    statusCode: 200,
    body: monitors,
  };
};

// { "email": "lucas@zetaverse.dev", "name": "lucas", "nickname": "lucasssssssss", "availablenickdate": "2022-08-31" }
export const createMonitor = async (event) => {
  const { name, email, nickname, availablenickdate } = JSON.parse(event.body);
  await db
    .insertInto("monitor")
    .values({
      name,
      email,
      nickname,
      availablenickdate,
    })
    .execute();
  return {
    statusCode: 201,
  };
};
