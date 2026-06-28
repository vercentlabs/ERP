import type { Router } from "express";
import { timesheetsController } from "./controller";
import { manifest } from "./manifest";

export function registerTimesheetsRoutes(router: Router) {
  router.get(manifest.routeBase, timesheetsController.list);
  router.post(manifest.routeBase, timesheetsController.create);
  router.patch(`${manifest.routeBase}/:id`, timesheetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, timesheetsController.transition);
}
