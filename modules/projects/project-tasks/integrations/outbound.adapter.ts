export const projectTasksOutboundAdapter = {
  name: "projects/project-tasks.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/project-tasks",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
