export const nonConformanceSyncJob = {
  name: "quality/non-conformance.sync",
  queue: "quality-non-conformance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
