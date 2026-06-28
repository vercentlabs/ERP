export const importsSyncJob = {
  name: "platform/imports.sync",
  queue: "platform-imports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
