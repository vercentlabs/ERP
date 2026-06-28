export const billingSchedulesSyncJob = {
  name: "subscriptions/billing-schedules.sync",
  queue: "subscriptions-billing-schedules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
