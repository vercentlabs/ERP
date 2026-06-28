import type { Router } from "express";
import { segmentsController } from "./controller";
import { manifest } from "./manifest";

export function registerSegmentsRoutes(router: Router) {
  router.get(manifest.routeBase, segmentsController.list);
  router.post(manifest.routeBase, segmentsController.create);
  router.patch(`${manifest.routeBase}/:id`, segmentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, segmentsController.transition);
}
