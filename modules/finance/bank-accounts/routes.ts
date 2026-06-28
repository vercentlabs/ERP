import type { Router } from "express";
import { bankAccountsController } from "./controller";
import { manifest } from "./manifest";

export function registerBankAccountsRoutes(router: Router) {
  router.get(manifest.routeBase, bankAccountsController.list);
  router.post(manifest.routeBase, bankAccountsController.create);
  router.patch(`${manifest.routeBase}/:id`, bankAccountsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, bankAccountsController.transition);
}
