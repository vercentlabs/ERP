export const leaveRecomputeJob = {
  name: "hr/leave.recompute",
  queue: "hr-leave",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
