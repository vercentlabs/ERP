import type { Router } from "express";
import { fieldInvoicingController } from "./controller";
import { manifest } from "./manifest";

export function registerFieldInvoicingRoutes(router: Router) {
  router.get(manifest.routeBase, fieldInvoicingController.list);
  router.post(manifest.routeBase, fieldInvoicingController.create);
  router.patch(`${manifest.routeBase}/:id`, fieldInvoicingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, fieldInvoicingController.transition);
}
