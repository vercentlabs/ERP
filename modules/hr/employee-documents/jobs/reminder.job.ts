export const employeeDocumentsReminderJob = {
  name: "hr/employee-documents.reminder",
  queue: "hr-employee-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
