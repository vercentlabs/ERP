export const knowledgeBaseSyncJob = {
  name: "helpdesk/knowledge-base.sync",
  queue: "helpdesk-knowledge-base",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
