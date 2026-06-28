export const leaveSyncJob = {
  name: "hr/leave.sync",
  queue: "hr-leave",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
