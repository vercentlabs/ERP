export const cashFlowReminderJob = {
  name: "finance/cash-flow.reminder",
  queue: "finance-cash-flow",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
