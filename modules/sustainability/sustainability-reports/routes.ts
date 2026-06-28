import type { Router } from "express";
import { sustainabilityReportsController } from "./controller";
import { manifest } from "./manifest";

export function registerSustainabilityReportsRoutes(router: Router) {
  router.get(manifest.routeBase, sustainabilityReportsController.list);
  router.post(manifest.routeBase, sustainabilityReportsController.create);
  router.patch(`${manifest.routeBase}/:id`, sustainabilityReportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, sustainabilityReportsController.transition);
}
