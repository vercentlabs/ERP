export const internalControlsReminderJob = {
  name: "risk-management/internal-controls.reminder",
  queue: "risk-management-internal-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
