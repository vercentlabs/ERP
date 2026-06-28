import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL("../..", import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@vercent/shared-types": `${root}/packages/shared-types/src/index.ts`,
      "@vercent/database/knex": `${root}/packages/database/src/knex.ts`,
      "@vercent/permissions/policyEvaluator": `${root}/packages/permissions/src/policyEvaluator.ts`,
      "@vercent/permissions/rbac": `${root}/packages/permissions/src/rbac.ts`,
      "@vercent/permissions/abac": `${root}/packages/permissions/src/abac.ts`,
      "@vercent/workflows/workflowRuntime": `${root}/packages/workflows/src/workflowRuntime.ts`,
      "@vercent/workflows/workflowDefinition": `${root}/packages/workflows/src/workflowDefinition.ts`,
    },
  },
});
