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
        className={classNames("bg-white", {
          "w-96 sm:w-6/12": router.pathname.includes("admin") === false,
          "w-screen": router.pathname.includes("admin") === true,
        })}
      >
        {children}
      </div>
    </div>
  );
}
