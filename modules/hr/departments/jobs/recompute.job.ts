export const departmentsRecomputeJob = {
  name: "hr/departments.recompute",
  queue: "hr-departments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
