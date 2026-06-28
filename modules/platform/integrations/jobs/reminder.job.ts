export const integrationsReminderJob = {
  name: "platform/integrations.reminder",
  queue: "platform-integrations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
