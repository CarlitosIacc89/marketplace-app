"use client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = ({ session }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <header className="border-b p-4 flex items-center justify-between h-14">
      <Link className="text-blue-600 font-bold text-2xl" href={"/"}>
        Marketplace
      </Link>
      <nav className="flex gap-4 *:rounded items-center ">
        <Link
          href={"/new"}
          className="border border-blue-600 text-blue-600 inline-flex gap-1 items-center py-1 px-4 mr-4"
        >
          <FontAwesomeIcon icon={faPlus} className="h-4" />
          <span>Post an ad</span>
        </Link>
        <span className="border-r"></span>
        {session?.user ? (
          <>
            <div className="relative flex items-center">
              <button onClick={() => setShowDropDown(!showDropDown)}>
                <Image
                  src={session?.user?.image}
                  width={35}
                  height={35}
                  alt="avatar"
                  className={`rounded-full relative ${showDropDown && "z-50"}`}
                />
              </button>
              {showDropDown && (
                <>
                  <div
                    className="bg-black/90 fixed inset-0 z-40"
                    onClick={() => setShowDropDown(false)}
                  ></div>
                  <div className="absolute z-50 right-0 top-9 w-24 rounded-md bg-white">
                    <Link
                      className="p-2 block text-center font-bold"
                      href={`/my-ads`}
                      onClick={() => setShowDropDown(false)}
                    >
                      My ads
                    </Link>
                    <button
                      className="p-2 w-full font-bold text-red-500"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="text-gray-600">Sign up</button>
            <button
              className="bg-blue-600 text-white px-6 py-1"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
