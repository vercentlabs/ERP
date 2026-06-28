export const projectTasksInboundAdapter = {
  name: "projects/project-tasks.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/project-tasks",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
