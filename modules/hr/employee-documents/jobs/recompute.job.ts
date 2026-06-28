export const employeeDocumentsRecomputeJob = {
  name: "hr/employee-documents.recompute",
  queue: "hr-employee-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
