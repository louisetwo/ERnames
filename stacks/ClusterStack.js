import { RDS } from "@serverless-stack/resources";

export function ClusterStack({ stack }) {
  const DATABASE = "MyDatabase";

  // Create the Aurora DB cluster
  const Cluster = new RDS(stack, "Cluster", {
    engine: "postgresql10.14",
    defaultDatabaseName: DATABASE,
    scaling: {
      autoPause: true,
      minCapacity: "ACU_2",
      maxCapacity: "ACU_2",
    },
    migrations: "backend/migrations",
  });

  return { DATABASE, Cluster };
}
