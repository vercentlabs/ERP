export const timesheetsRecomputeJob = {
  name: "projects/timesheets.recompute",
  queue: "projects-timesheets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
