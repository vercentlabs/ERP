export const customFieldsRecomputeJob = {
  name: "extension-studio/custom-fields.recompute",
  queue: "extension-studio-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
