export const policyManagementReminderJob = {
  name: "risk-management/policy-management.reminder",
  queue: "risk-management-policy-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
