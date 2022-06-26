import { Api, Cron, use } from "@serverless-stack/resources";
import { ClusterStack } from "./ClusterStack";

export function ApiStack({ stack, app }) {
  const { Cluster, DATABASE } = use(ClusterStack);
  const environment = {
    DATABASE,
    CLUSTER_ARN: Cluster.clusterArn,
    SECRET_ARN: Cluster.secretArn,
    ER_API_KEY: process.env.ER_API_KEY,
  };

  // Create the API
  const api = new Api(stack, "api", {
    routes: {
      "GET /monitor": "functions/monitor.getMonitors",
      "GET /dailyMonitors": "functions/monitor.getDailyMonitors",
      "POST /monitor": "functions/monitor.createMonitor",
      "GET /checkNickname": "functions/ERIntegration.checkNickname",
    },
    defaults: {
      function: {
        environment,
        permissions: [Cluster],
      },
    },
  });

  new Cron(stack, "Cron", {
    schedule: "rate(1 day)",
    job: {
      function: {
        handler: "functions/monitor.sendDailyMonitors",
        environment,
        permissions: [Cluster, "ses:SendEmail"],
      },
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
