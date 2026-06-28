export const customFieldsReminderJob = {
  name: "extension-studio/custom-fields.reminder",
  queue: "extension-studio-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
