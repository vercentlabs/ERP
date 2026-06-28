export const paymentsSyncJob = {
  name: "finance/payments.sync",
  queue: "finance-payments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
