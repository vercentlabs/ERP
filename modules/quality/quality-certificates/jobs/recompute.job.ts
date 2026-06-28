export const qualityCertificatesRecomputeJob = {
  name: "quality/quality-certificates.recompute",
  queue: "quality-quality-certificates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
