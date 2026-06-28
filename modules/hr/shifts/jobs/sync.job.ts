export const shiftsSyncJob = {
  name: "hr/shifts.sync",
  queue: "hr-shifts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
