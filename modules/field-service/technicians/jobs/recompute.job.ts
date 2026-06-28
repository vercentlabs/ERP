export const techniciansRecomputeJob = {
  name: "field-service/technicians.recompute",
  queue: "field-service-technicians",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
