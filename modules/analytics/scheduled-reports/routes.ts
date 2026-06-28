import type { Router } from "express";
import { scheduledReportsController } from "./controller";
import { manifest } from "./manifest";

export function registerScheduledReportsRoutes(router: Router) {
  router.get(manifest.routeBase, scheduledReportsController.list);
  router.post(manifest.routeBase, scheduledReportsController.create);
  router.patch(`${manifest.routeBase}/:id`, scheduledReportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, scheduledReportsController.transition);
}
