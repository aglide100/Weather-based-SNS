import React from "react";
import { useRouter } from "next/router";

type PromotionPost = {
  title: string; // 제목
  content: string; // 내용
  date: string; // 60%
};

const dumpEvent: PromotionPost = {
  title: "가을 코디",
  content: "이번 달 가장 인기 있는 가을 코디를 선정합니다!",
  date: "2021.11.01 ~ 11.30",
};

const PromotionPost: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="mt-10">
        <div
          className="box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/음식22.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.01 ~ 11.30
              </div>
              <div className="block mt-1 text-lg leading-tight font-semibold text-black">
                이번 달 가장 인기 있는 음식 <div>#웨더선정음식</div>
              </div>
              <p className="mt-2 text-gray-500">
                자신이 좋아하는 맛집과 음식을 공유해주세요
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div
          className=" box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/프로모션정방향.png" className="object-fill " />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.08 ~ 11.14
              </div>
              <div className="block mt-1 text-lg font-semibold leading-tight text-black">
                일주일 스타일 챌린지 <div>#한주간OOTD</div>
              </div>
              <p className="mt-2 text-gray-500 font-medium ">
                한 주간의 자신의 스타일을 마구 공유해주세요 !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromotionPost2: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="mt-10">
        <div
          className=" box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/특이한포즈.jpg" className="object-fill " />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.10 ~ 11.20
              </div>
              <div className="block mt-1 text-lg font-semibold leading-tight text-black">
                특이한 포즈 선정 #내가최고
              </div>
              <p className="mt-2 text-gray-500 font-medium ">
                자신만의 포즈로 찍은 게시글을 선정합니다 ~
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div
          className="box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/랜덤.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.11.18 ~ 11.19
              </div>
              <div className="block mt-1 text-lg leading-tight font-semibold text-black">
                깜짝이벤트 랜덤 선정
              </div>
              <p className="mt-2 text-gray-500">
                기간안에 게시한 글 중 랜덤으로 선정합니다 !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PromotionPost3: React.FC<{}> = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="mt-10">
        <div
          className=" box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/겨울아이템.jpg" className="object-fill " />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.12.01 ~ 12.15
              </div>
              <div className="block mt-1 text-lg font-semibold leading-tight text-black">
                올 겨울을 따뜻하게 보낼 나만의 #겨울아이템
              </div>
              <p className="mt-2 text-gray-500 font-medium ">
                추운 겨울 함께 하면 좋은 자신의 아이템을 공유해주세요!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div
          className="box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img src="/크리스마스.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-sm text-purple-700 font-semibold">
                2021.12.24 ~ 12.25
              </div>
              <div className="block mt-1 text-lg leading-tight font-semibold text-black">
                크리스마스와 함께 보내는 <div>나의 일상 #크리스마스</div>
              </div>
              <p className="mt-2 text-gray-500">
                크리스마스 이브와 당일 작성된 게시글 중 인기 게시글을 선정합니다
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
    <div className="bg-indigo-200">
      <div className="mt-10 text-2xl mx-4 font-light text-black">
        진행중인 Event
      </div>
      <PromotionPost3></PromotionPost3>
      <PromotionPost2></PromotionPost2>
      <PromotionPost></PromotionPost>
    </div>
  );
};

export default MainPage;
