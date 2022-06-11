import { Api, RDS } from "@serverless-stack/resources";

export function MyStack({ stack }) {
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

  new Api(stack, "api", {
    routes: {
      "GET /monitor": "functions/monitor.getMonitors",
      "GET /dailyMonitors": "functions/monitor.getDailyMonitors",
      "POST /monitor": "functions/monitor.createMonitor",
      "GET /checkNickname": "functions/ERIntegration.checkNickname",
    },
    defaults: {
      function: {
        environment: {
          DATABASE,
          CLUSTER_ARN: Cluster.clusterArn,
          SECRET_ARN: Cluster.secretArn,
          ER_API_KEY: process.env.ER_API_KEY,
        },
        permissions: [Cluster],
      },
    },
  });
}
