export const recruitmentReminderJob = {
  name: "hr/recruitment.reminder",
  queue: "hr-recruitment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
