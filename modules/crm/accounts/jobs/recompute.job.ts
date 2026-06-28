export const accountsRecomputeJob = {
  name: "crm/accounts.recompute",
  queue: "crm-accounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
