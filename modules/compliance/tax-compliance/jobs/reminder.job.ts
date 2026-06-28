export const taxComplianceReminderJob = {
  name: "compliance/tax-compliance.reminder",
  queue: "compliance-tax-compliance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
