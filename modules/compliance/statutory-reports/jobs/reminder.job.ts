export const statutoryReportsReminderJob = {
  name: "compliance/statutory-reports.reminder",
  queue: "compliance-statutory-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
