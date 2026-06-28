export const billingSchedulesRecomputeJob = {
  name: "subscriptions/billing-schedules.recompute",
  queue: "subscriptions-billing-schedules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
