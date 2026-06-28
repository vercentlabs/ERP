export const educationReminderJob = {
  name: "industry-packs/education.reminder",
  queue: "industry-packs-education",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
