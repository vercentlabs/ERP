import type { Router } from "express";
import { dataGovernanceController } from "./controller";
import { manifest } from "./manifest";

export function registerDataGovernanceRoutes(router: Router) {
  router.get(manifest.routeBase, dataGovernanceController.list);
  router.post(manifest.routeBase, dataGovernanceController.create);
  router.patch(`${manifest.routeBase}/:id`, dataGovernanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dataGovernanceController.transition);
}
