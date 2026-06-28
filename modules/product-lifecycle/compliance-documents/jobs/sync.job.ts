export const complianceDocumentsSyncJob = {
  name: "product-lifecycle/compliance-documents.sync",
  queue: "product-lifecycle-compliance-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
