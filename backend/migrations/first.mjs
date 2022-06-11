import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("monitor")
    .addColumn("email", "text", (col) => col.primaryKey())
    .addColumn("name", "text")
    .addColumn("nickname", "text", (col) => col.notNull())
    .addColumn("availablenickdate", "datetime")
    .execute();
}
/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("monitor").execute();
}
