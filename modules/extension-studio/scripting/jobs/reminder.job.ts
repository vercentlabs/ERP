export const scriptingReminderJob = {
  name: "extension-studio/scripting.reminder",
  queue: "extension-studio-scripting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
