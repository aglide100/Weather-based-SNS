import React from "react";
import { useRouter } from "next/router";

type PromotionPost = {
  title: string; // 제목
  content: string; // 내용
  date: string; // 60%
};

const PromotionPost: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="mt-10">
        <div
          className=" box-content h-100 w-50
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/프로모션정방향.png" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.21 ~ 11.28
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-black">
                일주일챌린지 #OOTD
              </div>
              <p className="mt-2 text-gray-500">
                한 주간의 자신의 옷 스타일을 공유해주세요 !
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div
          className="box-content h-100 w-50
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/프로모션정방향.png" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.21 ~ 11.28
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-black">
                일주일챌린지 #OOTD
              </div>
              <p className="mt-2 text-gray-500">
                한 주간의 자신의 옷 스타일을 공유해주세요 !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainPage: React.FC<{}> = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mt-10 text-2xl mx-4 font-light">진행중인 Event</div>
      <PromotionPost></PromotionPost>
      <PromotionPost></PromotionPost>
      <PromotionPost></PromotionPost>
    </div>
  );
};

export default MainPage;
