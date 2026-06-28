import type { Router } from "express";
import { loansAdvancesController } from "./controller";
import { manifest } from "./manifest";

export function registerLoansAdvancesRoutes(router: Router) {
  router.get(manifest.routeBase, loansAdvancesController.list);
  router.post(manifest.routeBase, loansAdvancesController.create);
  router.patch(`${manifest.routeBase}/:id`, loansAdvancesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, loansAdvancesController.transition);
}
