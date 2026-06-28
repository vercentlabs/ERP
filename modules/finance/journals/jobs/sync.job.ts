export const journalsSyncJob = {
  name: "finance/journals.sync",
  queue: "finance-journals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
