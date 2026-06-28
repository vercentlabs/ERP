export const incidentsRecomputeJob = {
  name: "risk-management/incidents.recompute",
  queue: "risk-management-incidents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
