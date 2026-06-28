export const timesheetsSyncJob = {
  name: "projects/timesheets.sync",
  queue: "projects-timesheets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
