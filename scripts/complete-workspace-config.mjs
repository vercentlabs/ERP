import { mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();

const writeJson = async (filePath, value) => {
  await writeFile(join(root, filePath), `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const packageTsconfig = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    baseUrl: "../..",
    ignoreDeprecations: "5.0",
    paths: {
      "@vercent/shared-types": ["packages/shared-types/src/index.ts"],
      "@vercent/shared-ui": ["packages/shared-ui/src/index.ts"],
      "@vercent/shared-sdk": ["packages/shared-sdk/src/index.ts"],
      "@vercent/observability": ["packages/observability/src/index.ts"],
      "@vercent/database/*": ["packages/database/src/*"],
      "@vercent/permissions/*": ["packages/permissions/src/*"],
      "@vercent/workflows/*": ["packages/workflows/src/*"],
      "@vercent/document-engine/*": ["packages/document-engine/src/*"],
      "@vercent/reporting-engine/*": ["packages/reporting-engine/src/*"],
      "@vercent/localization/*": ["packages/localization/src/*"],
      "@vercent/integrations-sdk/*": ["packages/integrations-sdk/src/*"]
    }
  },
  include: ["src/**/*.ts", "src/**/*.tsx"],
  exclude: ["node_modules", "dist", "coverage"]
};

const serviceTsconfig = {
  extends: "../../tsconfig.base.json",
  compilerOptions: {
    baseUrl: "../..",
    ignoreDeprecations: "5.0",
    paths: {
      "@vercent/shared-types": ["packages/shared-types/src/index.ts"],
      "@vercent/observability": ["packages/observability/src/index.ts"],
      "@vercent/database/*": ["packages/database/src/*"],
      "@vercent/permissions/*": ["packages/permissions/src/*"],
      "@vercent/workflows/*": ["packages/workflows/src/*"],
      "@vercent/document-engine/*": ["packages/document-engine/src/*"],
      "@vercent/reporting-engine/*": ["packages/reporting-engine/src/*"]
    }
  },
  include: ["src/**/*.ts"],
  exclude: ["node_modules", "dist", "coverage"]
};

for (const entry of await readdir(join(root, "packages"), { withFileTypes: true })) {
  if (entry.isDirectory()) await writeJson(`packages/${entry.name}/tsconfig.json`, packageTsconfig);
}

for (const entry of await readdir(join(root, "services"), { withFileTypes: true })) {
  if (entry.isDirectory()) await writeJson(`services/${entry.name}/tsconfig.json`, serviceTsconfig);
}

console.log(JSON.stringify({ status: "workspace-tsconfigs-created" }, null, 2));
