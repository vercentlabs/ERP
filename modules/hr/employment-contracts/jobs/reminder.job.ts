export const employmentContractsReminderJob = {
  name: "hr/employment-contracts.reminder",
  queue: "hr-employment-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
