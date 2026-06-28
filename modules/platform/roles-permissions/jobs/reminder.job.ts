export const rolesPermissionsReminderJob = {
  name: "platform/roles-permissions.reminder",
  queue: "platform-roles-permissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
