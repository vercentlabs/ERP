import type { Router } from "express";
import { currenciesController } from "./controller";
import { manifest } from "./manifest";

export function registerCurrenciesRoutes(router: Router) {
  router.get(manifest.routeBase, currenciesController.list);
  router.post(manifest.routeBase, currenciesController.create);
  router.patch(`${manifest.routeBase}/:id`, currenciesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, currenciesController.transition);
}
