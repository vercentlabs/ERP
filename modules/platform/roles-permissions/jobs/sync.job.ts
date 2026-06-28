export const rolesPermissionsSyncJob = {
  name: "platform/roles-permissions.sync",
  queue: "platform-roles-permissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
