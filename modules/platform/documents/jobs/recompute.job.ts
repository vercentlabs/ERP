export const documentsRecomputeJob = {
  name: "platform/documents.recompute",
  queue: "platform-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
