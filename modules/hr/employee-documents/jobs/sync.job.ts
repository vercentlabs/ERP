export const employeeDocumentsSyncJob = {
  name: "hr/employee-documents.sync",
  queue: "hr-employee-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
