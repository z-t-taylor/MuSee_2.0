"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Micro_5 } from "next/font/google";
import localFont from "next/font/local";
import { Amphora, Images, House, Info } from "lucide-react";

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

const mobileItems = [
  { href: "/", icon: <House />, label: "Home" },
  { href: "/exhibits", icon: <Images />, label: "Exhibits" },
  { href: "/museums", icon: <Amphora />, label: "Museums" },
  { href: "/about", icon: <Info />, label: "About" },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-[#A9CBEF] md:rounded-t-none md:rounded-tr-2xl md:rounded-br-2xl">
      <h1
        className={`hidden md:block m-6 text-[#2d1707] ${micro5Font.className} text-[6rem]`}
      >
        MuSee
      </h1>
      <div className="hidden md:flex md:flex-col md:w-64 md:h-screen">
        {navItems.map((group, groupIndex) => (
          <div key={groupIndex} className={groupIndex > 0 ? "mt-10" : ""}>
            {group.map(({ href, label }, index) => {
              const isActive = pathname === href;
              const number = String(index + 1).padStart(2, "0");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`md:flex ml-6 pb-5 text-[#2d1707] ${
                    krungthep.className
                  } ${isActive ? "font-bold" : ""}`}
                >
                  <span
                    className={`text-xl ${
                      isActive ? "underline" : ""
                    } hover:underline`}
                  >
                    {label}
                  </span>
                  <span className="ml-2 text-[#8B4412] text-xs">{number}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around bg-[#A9CBEF] rounded-tl-2xl rounded-tr-2xl shadow-lg">
        {mobileItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`p-4 ${isActive ? "font-bold text-[#2d1707] " : ""}`}
              aria-label={label}
            >
              {icon}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
