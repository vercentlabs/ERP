export const employeesSyncJob = {
  name: "hr/employees.sync",
  queue: "hr-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
