import type { Router } from "express";
import { customWorkflowsController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomWorkflowsRoutes(router: Router) {
  router.get(manifest.routeBase, customWorkflowsController.list);
  router.post(manifest.routeBase, customWorkflowsController.create);
  router.patch(`${manifest.routeBase}/:id`, customWorkflowsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customWorkflowsController.transition);
}
