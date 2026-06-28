export const mitigationsReminderJob = {
  name: "risk-management/mitigations.reminder",
  queue: "risk-management-mitigations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
