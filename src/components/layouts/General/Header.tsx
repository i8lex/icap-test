import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";

import LogOutIcon from "../../../../public/IconsSet/log-out-01.svg";

import type { Page } from "@/types";
import type { FC } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLogoutSuccess } from "@/redux/slices/auth.slice";

export type GeneralHeaderProps = {
  currentPage: Page;
};

export const GeneralHeader: FC<GeneralHeaderProps> = ({ currentPage }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const links: Array<{ id: Page; href: string; name: string }> = [
    { id: "table", href: "/table", name: "Table" },
  ];
  return (
    <header className="flex justify-center bg-softGreen px-4 py-2 tablet:px-6">
      <nav className="flex w-full items-center p-0 tablet:gap-6 desktop:gap-8">
        <Link
          href={"/"}
          className="focus:border-green-80 focus:outline-none focus:ring-2 focus:ring-green-80"
        >
          {/*<Logo className="w-6 tablet:w-7" />*/}Logo here
        </Link>
        <div className="hidden space-x-8 text-quot font-medium  tablet:flex desktop:text-parS">
          {links.map(({ id, name, href }) => {
            const isCurrent = id === currentPage;
            return (
              <Link
                key={id}
                className={clsx(
                  "rounded-md py-1 px-2 focus:border-green-80 focus:outline-none focus:ring-2 focus:ring-green-80",
                  isCurrent
                    ? "bg-white shadow-sm shadow-dark-60 text-darkSkyBlue-90 "
                    : "bg-softGreen shadow-md shadow-dark-60 text-darkSkyBlue-60 hover:bg-darkSkyBlue-20",
                )}
                href={href}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            dispatch(setLogoutSuccess());
            router.push("/login").finally();
          }}
          className="solid h-7 w-7 flex flex-col items-center bg-white shadow-md shadow-dark-60 hover:shadow-sm hover:shadow-dark-60 hover:bg-softGreen justify-center overflow-hidden rounded-full border border-stroke focus:border-green-80 focus:outline-none focus:ring-2 focus:ring-green-80 tablet:h-8 tablet:w-8"
        >
          <LogOutIcon className="h-4 w-4 text-darkSkyBlue-60" />
        </button>
      </div>
    </header>
  );
};
