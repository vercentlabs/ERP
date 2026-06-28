export const mobileJobsReminderJob = {
  name: "field-service/mobile-jobs.reminder",
  queue: "field-service-mobile-jobs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
