export const complianceDocumentsRecomputeJob = {
  name: "product-lifecycle/compliance-documents.recompute",
  queue: "product-lifecycle-compliance-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
