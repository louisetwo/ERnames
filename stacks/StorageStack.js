import { Bucket } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
  const bucket = new Bucket(stack, "ReactWebSite");

  return { bucket };
}
