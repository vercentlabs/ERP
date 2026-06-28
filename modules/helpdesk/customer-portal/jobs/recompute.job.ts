export const customerPortalRecomputeJob = {
  name: "helpdesk/customer-portal.recompute",
  queue: "helpdesk-customer-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
