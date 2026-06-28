export const riskRegisterReminderJob = {
  name: "risk-management/risk-register.reminder",
  queue: "risk-management-risk-register",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
