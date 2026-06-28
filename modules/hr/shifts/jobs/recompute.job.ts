export const shiftsRecomputeJob = {
  name: "hr/shifts.recompute",
  queue: "hr-shifts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
