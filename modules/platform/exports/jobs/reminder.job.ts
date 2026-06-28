export const exportsReminderJob = {
  name: "platform/exports.reminder",
  queue: "platform-exports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
