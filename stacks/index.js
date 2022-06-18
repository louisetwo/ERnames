import { App } from "@serverless-stack/resources";
import { ClusterStack } from "./ClusterStack";
import { FrontendStack } from "./FrontendStack";
import { ApiStack } from "./ApiStack";
import { StorageStack } from "./StorageStack";

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "backend",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(ClusterStack)
    .stack(StorageStack)
    .stack(ApiStack)
    .stack(FrontendStack);
}
