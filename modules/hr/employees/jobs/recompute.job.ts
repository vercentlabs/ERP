export const employeesRecomputeJob = {
  name: "hr/employees.recompute",
  queue: "hr-employees",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
