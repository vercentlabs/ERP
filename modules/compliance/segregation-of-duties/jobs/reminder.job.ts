export const segregationOfDutiesReminderJob = {
  name: "compliance/segregation-of-duties.reminder",
  queue: "compliance-segregation-of-duties",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
