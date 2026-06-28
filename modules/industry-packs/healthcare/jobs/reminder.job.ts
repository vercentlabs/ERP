export const healthcareReminderJob = {
  name: "industry-packs/healthcare.reminder",
  queue: "industry-packs-healthcare",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
