export const certificationsSyncJob = {
  name: "compliance/certifications.sync",
  queue: "compliance-certifications",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
