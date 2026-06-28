export const projectTemplatesInboundAdapter = {
  name: "projects/project-templates.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/project-templates",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
