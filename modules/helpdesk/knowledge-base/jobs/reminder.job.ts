export const knowledgeBaseReminderJob = {
  name: "helpdesk/knowledge-base.reminder",
  queue: "helpdesk-knowledge-base",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
