import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Public sahifalarda next/link o'rniga SHU Link ishlatiladi —
// joriy locale prefiksini (/ru, /en) avtomatik saqlaydi.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
