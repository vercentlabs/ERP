export const activitiesSyncJob = {
  name: "crm/activities.sync",
  queue: "crm-activities",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
