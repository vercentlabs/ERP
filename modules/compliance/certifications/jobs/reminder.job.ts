export const certificationsReminderJob = {
  name: "compliance/certifications.reminder",
  queue: "compliance-certifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
