export const complianceDisclosuresRecomputeJob = {
  name: "sustainability/compliance-disclosures.recompute",
  queue: "sustainability-compliance-disclosures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
