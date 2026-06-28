export const documentsSyncJob = {
  name: "platform/documents.sync",
  queue: "platform-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
