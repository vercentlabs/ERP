export const employeesRecomputeJob = {
  name: "master-data/employees.recompute",
  queue: "master-data-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
