export const procurementPoliciesReminderJob = {
  name: "procurement/procurement-policies.reminder",
  queue: "procurement-procurement-policies",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
