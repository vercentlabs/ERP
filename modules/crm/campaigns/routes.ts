import type { Router } from "express";
import { campaignsController } from "./controller";
import { manifest } from "./manifest";

export function registerCampaignsRoutes(router: Router) {
  router.get(manifest.routeBase, campaignsController.list);
  router.post(manifest.routeBase, campaignsController.create);
  router.patch(`${manifest.routeBase}/:id`, campaignsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, campaignsController.transition);
}
