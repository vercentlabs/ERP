import type { Router } from "express";
import { qualityInspectionsController } from "./controller";
import { manifest } from "./manifest";

export function registerQualityInspectionsRoutes(router: Router) {
  router.get(manifest.routeBase, qualityInspectionsController.list);
  router.post(manifest.routeBase, qualityInspectionsController.create);
  router.patch(`${manifest.routeBase}/:id`, qualityInspectionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, qualityInspectionsController.transition);
}
