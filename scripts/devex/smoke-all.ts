import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../..", import.meta.url));

const steps = [
  "db:doctor",
  "db:migrate:all",
  "db:seed:dev",
  "smoke:crm-leads",
  "smoke:master-data",
  "smoke:lead-conversion",
  "smoke:crm-opportunities",
  "smoke:sales-quotations",
  "smoke:sales-orders",
  "smoke:inventory-stock",
  "smoke:sales-delivery-notes",
  "smoke:sales-invoices",
  "smoke:finance-accounting",
  "smoke:sales-invoice-accounting",
  "smoke:customer-receipts",
  "smoke:sales-credit-notes",
  "smoke:sales-debit-notes",
];

function runStep(script: string) {
  return new Promise<void>((resolveStep, reject) => {
    console.log(`\n==> pnpm ${script}`);
    const command = process.platform === "win32" ? "cmd.exe" : "pnpm";
    const args = process.platform === "win32" ? ["/d", "/s", "/c", "pnpm.cmd", script] : [script];
    const child = spawn(command, args, { cwd: rootDir, stdio: "inherit", shell: false });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolveStep();
      else reject(new Error(`Smoke step failed: ${script}`));
    });
  });
}

export async function run() {
  for (const step of steps) await runStep(step);
  console.log("\nAll smoke checks passed.");
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
