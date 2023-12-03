"use client";

import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import classNames from "classnames";

import { genres } from "@/core/constants/genres";

interface props {
  genreListId: string;
  setGenreListId: Dispatch<SetStateAction<string>>;
}

export const DropDown: React.FC<props> = ({ genreListId, setGenreListId }) => {
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
      <h2 className="font-bold text-3xl mb-2 text-white text-left">
        {" "}
        Discover {genreTitle ? genreTitle : "Electronic"}
      </h2>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300">
            {genreTitle ? genreTitle : "Electronic"}
            <FaChevronDown
              className="-mr-1 h-4 w-4 mt-[0.1rem]"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {genres.map((genre) => (
                <Menu.Item key={genre.value}>
                  {({ active }) => (
                    <span
                      onClick={(e) => setGenreListId(genre.value)}
                      className={classNames(
                        "block px-4 py-2 text-sm hover:cursor-pointer",
                        {
                          "bg-gradient-to-br from-white/10 to-[#2424bb] backdrop-blur-lg text-gray-100":
                            active,
                        }
                      )}
                    >
                      {genre.title}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
