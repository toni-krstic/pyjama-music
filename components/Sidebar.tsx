"use client";

import { useState } from "react";
import Link from "next/link";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

import { links } from "@/assets/constants";

interface Props {
  handleClick?: () => void;
}

const NavLinks: React.FC<Props> = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link) => (
      <Link
        key={link.name}
        href={link.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </Link>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <h1 className="text-xl">Pyjama Music</h1>
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
            data-testid="close-mobile-menu"
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(true)}
            data-testid="open-mobile-menu"
          />
        )}
      </div>

      <div
        data-testid="mobile-menu"
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <h1 className="text-lg">Pyjama Music</h1>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
