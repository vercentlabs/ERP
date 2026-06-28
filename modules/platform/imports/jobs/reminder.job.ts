export const importsReminderJob = {
  name: "platform/imports.reminder",
  queue: "platform-imports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
