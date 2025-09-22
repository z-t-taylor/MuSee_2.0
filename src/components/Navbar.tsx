import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/exhibits", label: "Exhibits" },
  { href: "/museums", label: "Museums" },
  { href: "/about", label: "About" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`hover:underline ${
              isActive ? "underline font-bold" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
