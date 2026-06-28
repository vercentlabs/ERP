export const controlsReminderJob = {
  name: "compliance/controls.reminder",
  queue: "compliance-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
