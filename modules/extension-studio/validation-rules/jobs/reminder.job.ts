export const validationRulesReminderJob = {
  name: "extension-studio/validation-rules.reminder",
  queue: "extension-studio-validation-rules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
