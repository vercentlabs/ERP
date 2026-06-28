export const rolesPermissionsRecomputeJob = {
  name: "platform/roles-permissions.recompute",
  queue: "platform-roles-permissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
