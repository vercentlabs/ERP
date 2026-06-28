export const qualityCertificatesSyncJob = {
  name: "quality/quality-certificates.sync",
  queue: "quality-quality-certificates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
