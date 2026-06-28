import type { Router } from "express";
import { carbonAccountingController } from "./controller";
import { manifest } from "./manifest";

export function registerCarbonAccountingRoutes(router: Router) {
  router.get(manifest.routeBase, carbonAccountingController.list);
  router.post(manifest.routeBase, carbonAccountingController.create);
  router.patch(`${manifest.routeBase}/:id`, carbonAccountingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, carbonAccountingController.transition);
}
