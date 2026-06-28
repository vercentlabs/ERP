export const returnsSyncJob = {
  name: "sales/returns.sync",
  queue: "sales-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
