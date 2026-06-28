export const formulaFieldsReminderJob = {
  name: "extension-studio/formula-fields.reminder",
  queue: "extension-studio-formula-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
