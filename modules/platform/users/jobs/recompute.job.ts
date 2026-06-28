export const usersRecomputeJob = {
  name: "platform/users.recompute",
  queue: "platform-users",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
