export const escalationsRecomputeJob = {
  name: "helpdesk/escalations.recompute",
  queue: "helpdesk-escalations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
