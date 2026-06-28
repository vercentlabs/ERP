export const entitlementsRecomputeJob = {
  name: "helpdesk/entitlements.recompute",
  queue: "helpdesk-entitlements",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
