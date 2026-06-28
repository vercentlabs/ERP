export const validationRulesRecomputeJob = {
  name: "extension-studio/validation-rules.recompute",
  queue: "extension-studio-validation-rules",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
