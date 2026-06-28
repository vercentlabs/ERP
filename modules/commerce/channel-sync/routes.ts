import type { Router } from "express";
import { channelSyncController } from "./controller";
import { manifest } from "./manifest";

export function registerChannelSyncRoutes(router: Router) {
  router.get(manifest.routeBase, channelSyncController.list);
  router.post(manifest.routeBase, channelSyncController.create);
  router.patch(`${manifest.routeBase}/:id`, channelSyncController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, channelSyncController.transition);
}
