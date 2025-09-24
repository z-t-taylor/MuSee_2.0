"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Micro_5 } from "next/font/google";
import localFont from "next/font/local";

const krungthep = localFont({
  src: "../fonts/Krungthep.ttf",
  weight: "400",
  style: "normal",
});

const micro5Font = Micro_5({
  subsets: ["latin"],
  weight: ["400"],
});

const navItems = [
  [
    { href: "/", label: "Home" },
    { href: "/exhibits", label: "Exhibits" },
  ],
  [
    { href: "/museums", label: "Museums" },
    { href: "/about", label: "About" },
  ],
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex md:flex-col md:w-64 md:h-screen bg-[#A9CBEF] rounded-tr-2xl rounded-br-2xl">
      <h1 className={`m-6 ${micro5Font.className} text-[6rem]`}>MuSee</h1>
      {navItems.map((group, groupIndex) => (
        <div key={groupIndex} className={groupIndex > 0 ? "mt-10" : ""}>
          {group.map(({ href, label }, index) => {
            const isActive = pathname === href;
            const number = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={href}
                href={href}
                className={`md:flex ml-6 pb-5 ${krungthep.className} ${
                  isActive ? "font-bold" : ""
                }`}
              >
                <span
                  className={`text-xl ${
                    isActive ? "underline" : ""
                  } hover:underline`}
                >
                  {label}
                </span>
                <span className="ml-2 text-[#CE6D23] text-xs">{number}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
};
