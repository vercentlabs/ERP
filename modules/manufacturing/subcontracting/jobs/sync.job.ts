export const subcontractingSyncJob = {
  name: "manufacturing/subcontracting.sync",
  queue: "manufacturing-subcontracting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
