export const mobileJobsSyncJob = {
  name: "field-service/mobile-jobs.sync",
  queue: "field-service-mobile-jobs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
