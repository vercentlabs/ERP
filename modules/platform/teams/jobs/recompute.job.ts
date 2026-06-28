export const teamsRecomputeJob = {
  name: "platform/teams.recompute",
  queue: "platform-teams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
