export const sustainabilityReportsReminderJob = {
  name: "sustainability/sustainability-reports.reminder",
  queue: "sustainability-sustainability-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
