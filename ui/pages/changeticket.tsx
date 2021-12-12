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
          className=" box-content h-75 w-75
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2"
        >
          <div className="h-56 object-cover relative">
            <img
              src="/교환권_갤러리아포레스트_정방향.png"
              className="object-fill"
            />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                갤러리아 포레스트 이용권
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x10</div>
                  <div className="text-xl text-center">재고량 50</div>
                </div>
              </div>
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
            <img src="/하겐다즈.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                하겐다즈 파인트
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x8</div>
                  <div className="text-xl text-center">재고량 80</div>
                </div>
              </div>
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
            <img src="/간장게장.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                간장게장 1세트
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x15</div>
                  <div className="text-xl text-center">재고량 30</div>
                </div>
              </div>
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
            <img src="/크루넥.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                크루 넥 긴팔 티셔츠
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x8</div>
                  <div className="text-xl text-center">재고량 50</div>
                </div>
              </div>
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
            <img src="/스팀맛있닭.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                스팀 맛읽닭 10개
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x10</div>
                  <div className="text-xl text-center">재고량 100</div>
                </div>
              </div>
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
            <img src="/알라딘.jpg" className="object-fill" />
          </div>
          <div className="flex">
            <div className="p-8">
              <div className="mt-15 tracking-wide text-lg  font-semibold">
                알라딘 5000원
                <div className="flex flex-row mt-5 text-gray-700 ">
                  <div className="w-12 h-12 object-cover relative ">
                    <img src="/ticket.png" className="object-fill" />
                  </div>
                  <div className="mt-6">x5</div>
                  <div className="text-xl text-center">재고량 30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangeTicket: React.FC<{}> = () => {
  const router = useRouter();

  return (
    <div className="bg-purple-300">
      <div className="mt-10 text-2xl mx-4 font-light ">교환소</div>
      <PromotionPost></PromotionPost>
      <PromotionPost2></PromotionPost2>
      <PromotionPost3></PromotionPost3>
    </div>
  );
};

export default ChangeTicket;
