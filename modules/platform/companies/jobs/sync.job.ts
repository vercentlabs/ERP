export const companiesSyncJob = {
  name: "platform/companies.sync",
  queue: "platform-companies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
