import { runSqlMigrations } from "./migration-runner";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export async function run() {
  const controlPlane = await runSqlMigrations("control-plane");
  const tenant = await runSqlMigrations("tenant");
  return { controlPlane, tenant };
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run()
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
