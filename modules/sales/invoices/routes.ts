import type { Router } from "express";
import { invoicesController } from "./controller";
import { manifest } from "./manifest";

export function registerInvoicesRoutes(router: Router) {
  router.get(manifest.routeBase, invoicesController.list);
  router.post(manifest.routeBase, invoicesController.create);
  router.patch(`${manifest.routeBase}/:id`, invoicesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, invoicesController.transition);
}
