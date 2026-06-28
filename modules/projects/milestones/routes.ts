import type { Router } from "express";
import { milestonesController } from "./controller";
import { manifest } from "./manifest";

export function registerMilestonesRoutes(router: Router) {
  router.get(manifest.routeBase, milestonesController.list);
  router.post(manifest.routeBase, milestonesController.create);
  router.patch(`${manifest.routeBase}/:id`, milestonesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, milestonesController.transition);
}
