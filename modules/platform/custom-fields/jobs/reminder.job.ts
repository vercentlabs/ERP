export const customFieldsReminderJob = {
  name: "platform/custom-fields.reminder",
  queue: "platform-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
