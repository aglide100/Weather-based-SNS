import React, { ReactNode } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

type UsingMobileWrapperProps = {
  children: ReactNode;
};

export default function UsingMobileWrapper({
  children,
}: UsingMobileWrapperProps) {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-row justify-center bg-gray-400">
      <div
        className={classNames(
          "bg-white w-96 sm:w-2/4 overflow-scroll overflow-x-hidden z-10",
          {
            "w-screen": router.pathname === "admin",
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}
