import { accountNavigation } from "../constants/accountNavigation.constants";
import type { DemoSession } from "../types/session.type";

export function visibleAccountNavigation(role: DemoSession["role"]) {
  return accountNavigation.filter(
    (item) => item.href !== "/administracion" || role === "superadmin",
  );
}
