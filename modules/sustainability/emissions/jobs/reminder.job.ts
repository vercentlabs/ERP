export const emissionsReminderJob = {
  name: "sustainability/emissions.reminder",
  queue: "sustainability-emissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
