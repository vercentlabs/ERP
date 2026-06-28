import type { Router } from "express";
import { branchesController } from "./controller";
import { manifest } from "./manifest";

export function registerBranchesRoutes(router: Router) {
  router.get(manifest.routeBase, branchesController.list);
  router.post(manifest.routeBase, branchesController.create);
  router.patch(`${manifest.routeBase}/:id`, branchesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, branchesController.transition);
}
