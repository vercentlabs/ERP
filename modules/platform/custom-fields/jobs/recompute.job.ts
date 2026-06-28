export const customFieldsRecomputeJob = {
  name: "platform/custom-fields.recompute",
  queue: "platform-custom-fields",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
