export const incidentsSyncJob = {
  name: "risk-management/incidents.sync",
  queue: "risk-management-incidents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
