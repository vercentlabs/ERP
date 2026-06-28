export const validationRulesSyncJob = {
  name: "extension-studio/validation-rules.sync",
  queue: "extension-studio-validation-rules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
