export const supplierSustainabilitySyncJob = {
  name: "sustainability/supplier-sustainability.sync",
  queue: "sustainability-supplier-sustainability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
