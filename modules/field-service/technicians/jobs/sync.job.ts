export const techniciansSyncJob = {
  name: "field-service/technicians.sync",
  queue: "field-service-technicians",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
