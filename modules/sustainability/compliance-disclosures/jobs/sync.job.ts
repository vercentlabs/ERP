export const complianceDisclosuresSyncJob = {
  name: "sustainability/compliance-disclosures.sync",
  queue: "sustainability-compliance-disclosures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
