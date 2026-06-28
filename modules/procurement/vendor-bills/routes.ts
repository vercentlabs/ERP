import type { Router } from "express";
import { vendorBillsController } from "./controller";
import { manifest } from "./manifest";

export function registerVendorBillsRoutes(router: Router) {
  router.get(manifest.routeBase, vendorBillsController.list);
  router.post(manifest.routeBase, vendorBillsController.create);
  router.patch(`${manifest.routeBase}/:id`, vendorBillsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, vendorBillsController.transition);
}
