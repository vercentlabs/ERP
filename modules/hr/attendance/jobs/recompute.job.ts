export const attendanceRecomputeJob = {
  name: "hr/attendance.recompute",
  queue: "hr-attendance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
