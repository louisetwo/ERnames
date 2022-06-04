import client from "data-api-client";

const db = client({
  database: process.env.DATABASE,
  secretArn: process.env.SECRET_ARN,
  resourceArn: process.env.CLUSTER_ARN,
});
export const getMonitors = async (event) => {
  // const record = await db.query(
  //   `INSERT INTO monitor(email, name, nickname) VALUES('email@email', 'nome', 'nick')`
  // );
  const record = await db.query(`SELECT * FROM monitor`);
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: record,
  };
};

// { "email": "lucas@zetaverse.dev", "name": "lucas", "nickname": "lucasssssssss", "availablenickdate": "2022-08-31" }
export const createMonitor = async (event) => {
  const { name, email, nickname, availablenickdate } = JSON.parse(event.body);
  const record = await db.query(
    `INSERT INTO monitor(email, name, nickname, availablenickdate) VALUES(:email, :name, :nickname, :availablenickdate)`,
    { name, email, nickname, availablenickdate: new Date(availablenickdate) }
  );
  return {
    statusCode: 201,
    body: record,
  };
};
