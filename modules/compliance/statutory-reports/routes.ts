import type { Router } from "express";
import { statutoryReportsController } from "./controller";
import { manifest } from "./manifest";

export function registerStatutoryReportsRoutes(router: Router) {
  router.get(manifest.routeBase, statutoryReportsController.list);
  router.post(manifest.routeBase, statutoryReportsController.create);
  router.patch(`${manifest.routeBase}/:id`, statutoryReportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, statutoryReportsController.transition);
}
