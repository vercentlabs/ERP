import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../..", import.meta.url));
const composeFile = "infrastructure/docker/compose.local.yml";
const composeProject = "vercent-erp-local";

function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolveCommand, reject) => {
    console.log(`> ${command} ${args.join(" ")}`);
    const child = spawn(command, args, { cwd: rootDir, stdio: "inherit", shell: false });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolveCommand();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function runPnpmScript(script: string) {
  const command = process.platform === "win32" ? "cmd.exe" : "pnpm";
  const args = process.platform === "win32" ? ["/d", "/s", "/c", "pnpm.cmd", script] : [script];
  return runCommand(command, args);
}

export async function run() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Refusing to reset a database while NODE_ENV=production");
  }

  console.log("This is destructive for the Vercent local Docker database only.");
  console.log(`It removes the compose project '${composeProject}' volumes and recreates the local services.`);
  console.log("It does not stop or remove unrelated local PostgreSQL servers.");

  await runCommand("docker", ["compose", "-p", composeProject, "-f", composeFile, "down", "-v", "--remove-orphans"]);
  await runCommand("docker", ["compose", "-p", composeProject, "-f", composeFile, "up", "-d", "postgres", "redis"]);
  await runPnpmScript("db:doctor");
  await runPnpmScript("db:migrate:all");
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    console.error("\nManual fallback:");
    console.error(`docker compose -p ${composeProject} -f ${composeFile} down -v --remove-orphans`);
    console.error(`docker compose -p ${composeProject} -f ${composeFile} up -d postgres redis`);
    console.error("pnpm db:migrate:all");
    process.exitCode = 1;
  });
}
