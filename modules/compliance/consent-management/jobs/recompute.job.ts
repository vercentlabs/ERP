export const consentManagementRecomputeJob = {
  name: "compliance/consent-management.recompute",
  queue: "compliance-consent-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
