export const returnsRepairsRecomputeJob = {
  name: "helpdesk/returns-repairs.recompute",
  queue: "helpdesk-returns-repairs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
