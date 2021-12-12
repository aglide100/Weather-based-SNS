import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { getCookie, removeCookie } from "../utils/cookie";
import { Router, useRouter } from "next/router";
type Props = {
  children?: ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = "This is the default title",
}: Props) {
  let header: ReactElement;
  const router = useRouter();

  const [loginMenu, setLoginMenu] = useState<ReactElement>();

  useEffect(() => {
    const token = getCookie("user");
    const accessToken = getCookie("accessToken");
    console.log("token" + token);
    if (token == undefined || token == null || !token || token.length == 0) {
      setLoginMenu(
        <>
          <Link href="/signin">
            <a>
              <img src="/login (1).png" className="w-10 h-9"></img>
            </a>
          </Link>{" "}
        </>
      );
    } else {
      setLoginMenu(
        <>
          {token}{" "}
          <span
            onClick={() => {
              removeCookie("user");
              removeCookie("accessToken");

              document.location.href = "/";
            }}
          >
            <div></div>
            로그아웃
          </span>{" "}
        </>
      );
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-9" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className="ml-3 mt-2 w-full flex flex-row">
          <Link href="/">
            <a>
              <img src="/home.png" className="w-10 h-9"></img>
            </a>
          </Link>{" "}
          <div className="flex flex-row w-full justify-end">
            <div className="grid grid-cols-3 gap-3">
              <div>{loginMenu}</div>
              <div>
                <Link href="/mypage">
                  <a>
                    <img src="/mypage.png" className="w-10 h-9 mr-5"></img>
                  </a>
                </Link>{" "}
              </div>
              <div>
                <Link href="/category">
                  <a>
                    <img src="/메뉴 검정.png" className="w-10 h-9 mr-5"></img>
                  </a>
                </Link>{" "}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
