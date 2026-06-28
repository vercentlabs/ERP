export const customWorkflowsReminderJob = {
  name: "extension-studio/custom-workflows.reminder",
  queue: "extension-studio-custom-workflows",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
