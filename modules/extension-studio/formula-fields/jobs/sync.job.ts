export const formulaFieldsSyncJob = {
  name: "extension-studio/formula-fields.sync",
  queue: "extension-studio-formula-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
