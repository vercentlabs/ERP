import type { Router } from "express";
import { productRevisionsController } from "./controller";
import { manifest } from "./manifest";

export function registerProductRevisionsRoutes(router: Router) {
  router.get(manifest.routeBase, productRevisionsController.list);
  router.post(manifest.routeBase, productRevisionsController.create);
  router.patch(`${manifest.routeBase}/:id`, productRevisionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, productRevisionsController.transition);
}
