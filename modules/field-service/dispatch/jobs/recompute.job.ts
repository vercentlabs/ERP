export const dispatchRecomputeJob = {
  name: "field-service/dispatch.recompute",
  queue: "field-service-dispatch",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
