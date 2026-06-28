export const cashFlowSyncJob = {
  name: "finance/cash-flow.sync",
  queue: "finance-cash-flow",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
