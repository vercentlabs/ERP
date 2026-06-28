import type { Router } from "express";
import { qualityCertificatesController } from "./controller";
import { manifest } from "./manifest";

export function registerQualityCertificatesRoutes(router: Router) {
  router.get(manifest.routeBase, qualityCertificatesController.list);
  router.post(manifest.routeBase, qualityCertificatesController.create);
  router.patch(`${manifest.routeBase}/:id`, qualityCertificatesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, qualityCertificatesController.transition);
}
