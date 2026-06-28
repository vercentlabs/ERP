import type { Router } from "express";
import { accountsController } from "./controller";
import { manifest } from "./manifest";

export function registerAccountsRoutes(router: Router) {
  router.get(manifest.routeBase, accountsController.list);
  router.post(manifest.routeBase, accountsController.create);
  router.patch(`${manifest.routeBase}/:id`, accountsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, accountsController.transition);
}
