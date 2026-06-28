export const complianceDocumentsReminderJob = {
  name: "product-lifecycle/compliance-documents.reminder",
  queue: "product-lifecycle-compliance-documents",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
