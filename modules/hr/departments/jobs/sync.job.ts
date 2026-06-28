export const departmentsSyncJob = {
  name: "hr/departments.sync",
  queue: "hr-departments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
