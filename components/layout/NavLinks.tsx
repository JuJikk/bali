import React from "react";
import { NavItem } from "./Header";
import Link from "next/link";

type NavLinksProps = {
  navItems: NavItem[];
  pathname: string;
};

const NavLinks: React.FC<NavLinksProps> = ({ navItems, pathname }) => {
  return (
    <ul className="flex flex-row gap-11">
      {navItems.map((item, index) => (
        <li
          key={item.id}
          className={`body_xs lg:body_l leading-[23.45px] pb-2 lg:pb-0 ${
            item.href === pathname || (pathname === "/" && index === 0)
              ? "!font-hk_bold text-grays-1000 border-b-2 border-grays-400 lg:border-none "
              : "!font-hk_regular text-grays-500 lg:text-grays-600"
          }`}
        >
          <Link href={item.href}>{item.title.en}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
