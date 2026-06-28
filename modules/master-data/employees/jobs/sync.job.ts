export const employeesSyncJob = {
  name: "master-data/employees.sync",
  queue: "master-data-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
