import React from "react";
import { useRouter } from "next/router";

const MainPage: React.FC<{}> = () => {
  const router = useRouter();

  return (
    <div>
      <div
        onClick={(event) => {
          event.preventDefault();
          router.push("/posts");
        }}
      >
        <div className="bg-indigo-200" style={{ height: "116.6px" }}></div>
        <div className="flex flex-col w-full bg-indigo-200">
          <div className="text-2xl  text-center">π μ·</div>
        </div>
        <div className="bg-indigo-200" style={{ height: "116.6px" }}></div>
      </div>

      <div
        onClick={(event) => {
          event.preventDefault();
          router.push("/foodPost");
        }}
      >
        <div className="bg-indigo-300" style={{ height: "116.6px" }}></div>
        <div className="flex flex-col w-full bg-indigo-300">
          <div className="text-2xl  text-center">π± μμ</div>
        </div>
        <div className="bg-indigo-300" style={{ height: "116.6px" }}></div>
      </div>

      <div
        onClick={(event) => {
          event.preventDefault();
          router.push("/category/daily");
        }}
      >
        <div className="bg-purple-300" style={{ height: "116.6px" }}></div>
        <div className="flex flex-col w-full bg-purple-300">
          <div className="text-2xl  text-center">π€Ύπ»ββ μΌμ</div>
        </div>
        <div className="bg-purple-300" style={{ height: "116.6px" }}></div>
      </div>

      <div
        onClick={(event) => {
          event.preventDefault();
          router.push("/category/etc");
        }}
      >
        <div className="bg-gray-300" style={{ height: "116.6px" }}></div>
        <div className="flex flex-col w-full bg-gray-300">
          <div className="text-2xl  text-center">β¨ κΈ°ν</div>
        </div>
        <div className="bg-gray-300" style={{ height: "116.6px" }}></div>
      </div>
    </div>
  );
};

export default MainPage;
