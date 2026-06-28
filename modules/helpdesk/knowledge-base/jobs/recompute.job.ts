export const knowledgeBaseRecomputeJob = {
  name: "helpdesk/knowledge-base.recompute",
  queue: "helpdesk-knowledge-base",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
