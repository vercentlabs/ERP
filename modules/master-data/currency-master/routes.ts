import type { Router } from "express";
import { currencyMasterController } from "./controller";
import { manifest } from "./manifest";

export function registerCurrencyMasterRoutes(router: Router) {
  router.get(manifest.routeBase, currencyMasterController.list);
  router.post(manifest.routeBase, currencyMasterController.create);
  router.patch(`${manifest.routeBase}/:id`, currencyMasterController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, currencyMasterController.transition);
}
