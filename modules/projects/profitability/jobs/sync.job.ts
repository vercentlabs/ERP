export const profitabilitySyncJob = {
  name: "projects/profitability.sync",
  queue: "projects-profitability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
