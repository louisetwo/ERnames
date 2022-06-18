import { Api, use } from "@serverless-stack/resources";
import { ClusterStack } from "./ClusterStack";

export function ApiStack({ stack, app }) {
  const { Cluster, DATABASE } = use(ClusterStack);

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

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
