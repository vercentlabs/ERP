import type { Router } from "express";
import { agentOrchestrationController } from "./controller";
import { manifest } from "./manifest";

export function registerAgentOrchestrationRoutes(router: Router) {
  router.get(manifest.routeBase, agentOrchestrationController.list);
  router.post(manifest.routeBase, agentOrchestrationController.create);
  router.patch(`${manifest.routeBase}/:id`, agentOrchestrationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, agentOrchestrationController.transition);
}
