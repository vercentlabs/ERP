import type { Router } from "express";
import { rfqsController } from "./controller";
import { manifest } from "./manifest";

export function registerRfqsRoutes(router: Router) {
  router.get(manifest.routeBase, rfqsController.list);
  router.post(manifest.routeBase, rfqsController.create);
  router.patch(`${manifest.routeBase}/:id`, rfqsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, rfqsController.transition);
}
