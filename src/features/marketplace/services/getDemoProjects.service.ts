import { demoProjects } from "../constants/marketplace.constants";
import type { DemoProject } from "../types/marketplace.type";

// Solo para probar estados de carga: no representa un backend ni una oferta real.
export function getDemoProjects(): Promise<readonly DemoProject[]> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(demoProjects), 650);
  });
}
