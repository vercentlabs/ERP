import type { Router } from "express";
import { freightRatesController } from "./controller";
import { manifest } from "./manifest";

export function registerFreightRatesRoutes(router: Router) {
  router.get(manifest.routeBase, freightRatesController.list);
  router.post(manifest.routeBase, freightRatesController.create);
  router.patch(`${manifest.routeBase}/:id`, freightRatesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, freightRatesController.transition);
}
