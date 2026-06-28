import type { Router } from "express";
import { workCentersController } from "./controller";
import { manifest } from "./manifest";

export function registerWorkCentersRoutes(router: Router) {
  router.get(manifest.routeBase, workCentersController.list);
  router.post(manifest.routeBase, workCentersController.create);
  router.patch(`${manifest.routeBase}/:id`, workCentersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, workCentersController.transition);
}
