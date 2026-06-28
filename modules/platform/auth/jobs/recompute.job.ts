export const authRecomputeJob = {
  name: "platform/auth.recompute",
  queue: "platform-auth",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
