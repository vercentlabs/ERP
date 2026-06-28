export const commentsReminderJob = {
  name: "platform/comments.reminder",
  queue: "platform-comments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
