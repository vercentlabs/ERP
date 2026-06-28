export const correctiveActionsReminderJob = {
  name: "quality/corrective-actions.reminder",
  queue: "quality-corrective-actions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
