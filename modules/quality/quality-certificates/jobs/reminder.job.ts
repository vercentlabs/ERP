export const qualityCertificatesReminderJob = {
  name: "quality/quality-certificates.reminder",
  queue: "quality-quality-certificates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
