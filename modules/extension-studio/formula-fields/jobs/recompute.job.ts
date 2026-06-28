export const formulaFieldsRecomputeJob = {
  name: "extension-studio/formula-fields.recompute",
  queue: "extension-studio-formula-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
