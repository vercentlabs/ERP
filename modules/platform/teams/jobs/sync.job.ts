export const teamsSyncJob = {
  name: "platform/teams.sync",
  queue: "platform-teams",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
