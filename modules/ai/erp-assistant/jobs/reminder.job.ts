export const erpAssistantReminderJob = {
  name: "ai/erp-assistant.reminder",
  queue: "ai-erp-assistant",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
