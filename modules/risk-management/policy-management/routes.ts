import type { Router } from "express";
import { policyManagementController } from "./controller";
import { manifest } from "./manifest";

export function registerPolicyManagementRoutes(router: Router) {
  router.get(manifest.routeBase, policyManagementController.list);
  router.post(manifest.routeBase, policyManagementController.create);
  router.patch(`${manifest.routeBase}/:id`, policyManagementController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, policyManagementController.transition);
}
