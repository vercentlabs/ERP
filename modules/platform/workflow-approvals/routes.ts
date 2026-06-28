import type { Router } from "express";
import { workflowApprovalsController } from "./controller";
import { manifest } from "./manifest";

export function registerWorkflowApprovalsRoutes(router: Router) {
  router.get(manifest.routeBase, workflowApprovalsController.list);
  router.post(manifest.routeBase, workflowApprovalsController.create);
  router.patch(`${manifest.routeBase}/:id`, workflowApprovalsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, workflowApprovalsController.transition);
}
