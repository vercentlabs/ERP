export const attendanceSyncJob = {
  name: "hr/attendance.sync",
  queue: "hr-attendance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
