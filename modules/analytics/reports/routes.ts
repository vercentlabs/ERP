import type { Router } from "express";
import { reportsController } from "./controller";
import { manifest } from "./manifest";

export function registerReportsRoutes(router: Router) {
  router.get(manifest.routeBase, reportsController.list);
  router.post(manifest.routeBase, reportsController.create);
  router.patch(`${manifest.routeBase}/:id`, reportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, reportsController.transition);
}
