import type { Router } from "express";
import { exchangeRatesController } from "./controller";
import { manifest } from "./manifest";

export function registerExchangeRatesRoutes(router: Router) {
  router.get(manifest.routeBase, exchangeRatesController.list);
  router.post(manifest.routeBase, exchangeRatesController.create);
  router.patch(`${manifest.routeBase}/:id`, exchangeRatesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, exchangeRatesController.transition);
}
