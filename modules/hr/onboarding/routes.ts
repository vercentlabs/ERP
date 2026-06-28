import type { Router } from "express";
import { onboardingController } from "./controller";
import { manifest } from "./manifest";

export function registerOnboardingRoutes(router: Router) {
  router.get(manifest.routeBase, onboardingController.list);
  router.post(manifest.routeBase, onboardingController.create);
  router.patch(`${manifest.routeBase}/:id`, onboardingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, onboardingController.transition);
}
