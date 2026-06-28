import type { Router } from "express";
import { inspectionPlansController } from "./controller";
import { manifest } from "./manifest";

export function registerInspectionPlansRoutes(router: Router) {
  router.get(manifest.routeBase, inspectionPlansController.list);
  router.post(manifest.routeBase, inspectionPlansController.create);
  router.patch(`${manifest.routeBase}/:id`, inspectionPlansController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, inspectionPlansController.transition);
}
