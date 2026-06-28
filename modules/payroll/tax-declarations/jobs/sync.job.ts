export const taxDeclarationsSyncJob = {
  name: "payroll/tax-declarations.sync",
  queue: "payroll-tax-declarations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
