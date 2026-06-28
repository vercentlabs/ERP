export const slasRecomputeJob = {
  name: "helpdesk/slas.recompute",
  queue: "helpdesk-slas",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
