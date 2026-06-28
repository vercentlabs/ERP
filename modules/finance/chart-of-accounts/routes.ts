import type { Router } from "express";
import { chartOfAccountsController } from "./controller";
import { manifest } from "./manifest";

export function registerChartOfAccountsRoutes(router: Router) {
  router.get(manifest.routeBase, chartOfAccountsController.list);
  router.post(manifest.routeBase, chartOfAccountsController.create);
  router.patch(`${manifest.routeBase}/:id`, chartOfAccountsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, chartOfAccountsController.transition);
}
