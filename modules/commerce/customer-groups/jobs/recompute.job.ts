export const customerGroupsRecomputeJob = {
  name: "commerce/customer-groups.recompute",
  queue: "commerce-customer-groups",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
