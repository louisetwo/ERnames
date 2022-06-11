import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema.dropTable("monitor").execute();
}
/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("monitor").execute();
}
