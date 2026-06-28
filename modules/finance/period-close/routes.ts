import type { Router } from "express";
import { periodCloseController } from "./controller";
import { manifest } from "./manifest";

export function registerPeriodCloseRoutes(router: Router) {
  router.get(manifest.routeBase, periodCloseController.list);
  router.post(manifest.routeBase, periodCloseController.create);
  router.patch(`${manifest.routeBase}/:id`, periodCloseController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, periodCloseController.transition);
}
