export const workflowApprovalsReminderJob = {
  name: "platform/workflow-approvals.reminder",
  queue: "platform-workflow-approvals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
