export const complianceDisclosuresReminderJob = {
  name: "sustainability/compliance-disclosures.reminder",
  queue: "sustainability-compliance-disclosures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
