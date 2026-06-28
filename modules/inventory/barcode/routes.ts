import type { Router } from "express";
import { barcodeController } from "./controller";
import { manifest } from "./manifest";

export function registerBarcodeRoutes(router: Router) {
  router.get(manifest.routeBase, barcodeController.list);
  router.post(manifest.routeBase, barcodeController.create);
  router.patch(`${manifest.routeBase}/:id`, barcodeController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, barcodeController.transition);
}
