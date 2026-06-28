import type { Router } from "express";
import { accountingPostingController } from "./controller";
import { manifest } from "./manifest";

export function registerAccountingPostingRoutes(router: Router) {
  router.get(manifest.routeBase, accountingPostingController.list);
  router.post(manifest.routeBase, accountingPostingController.create);
  router.patch(`${manifest.routeBase}/:id`, accountingPostingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, accountingPostingController.transition);
}
