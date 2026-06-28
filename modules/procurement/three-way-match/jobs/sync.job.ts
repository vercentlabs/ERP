export const threeWayMatchSyncJob = {
  name: "procurement/three-way-match.sync",
  queue: "procurement-three-way-match",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
