export const qualityInspectionsSyncJob = {
  name: "quality/quality-inspections.sync",
  queue: "quality-quality-inspections",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
