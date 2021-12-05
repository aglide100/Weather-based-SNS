import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

type todayWeatherProps = {
  kind: string; // 흐림, 비, 맑음
  temp: string; // 8도
  humidity: string; // 60%
};

const dumpWeatherData: todayWeatherProps = {
  kind: "맑음",
  temp: "7도",
  humidity: "40%",
};

const TodayWeather: React.FC<todayWeatherProps> = (
  props: todayWeatherProps
) => {
  return (
    <div className="flex flex-col">
      <div>{props.kind}</div>
      <div className="flex flex-row">
        {" "}
        {props.humidity} {props.temp}
      </div>
    </div>
  );
};

const TagList: React.FC<{}> = () => {
  return (
    <div>
      <div>의상</div>
      <div>음식</div>
      <div>활동</div>
      <div>기타</div>
    </div>
  );
};

type TodayWeatherEventProps = {
  id: string;
  onClickHandler(id: string): void;
};

const TodayWeatherEvent: React.FC<TodayWeatherEventProps> = (
  props: TodayWeatherEventProps
) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        props.onClickHandler(props.id);
      }}
    >
      {props.id}
    </div>
  );
};

const IndexPage: React.FC<{}> = ({}) => {
  const router = useRouter();
  const eventArray = new Array();

  function onClickHandler(id: string) {
    alert(id);
  }
  for (var i = 1; i < 11; i++) {
    let data: TodayWeatherEventProps = {
      id: i.toString(),
      onClickHandler: onClickHandler,
    };
    eventArray.push(data);
  }
  return (
    <div className="flex flex-col w-full mt-10">
      <div className="flex flex-row justify-around">
        <div>
          오늘의 날씨
          {/* <TodayWeather {...dumpWeatherData}></TodayWeather> */}
          <TodayWeather
            kind={dumpWeatherData.kind}
            humidity={dumpWeatherData.humidity}
            temp={dumpWeatherData.temp}
          ></TodayWeather>
        </div>
        <div>
          추천 태그
          <TagList></TagList>
        </div>
      </div>

      <div>
        내가 느낀 오늘의 날씨
        <div className="flex flex-row justify-around">
          {eventArray.map((data, index) => {
            return (
              <TodayWeatherEvent
                key={"click_today_weathers_feel" + index}
                id={data.id}
                onClickHandler={data.onClickHandler}
              ></TodayWeatherEvent>
            );
          })}
        </div>
      </div>

      <div
        className="w-90 h-60 bg-gray-200 mt-5 "
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
        <div className="text-white text-2xl"> 진행중인 Event {">"}</div>
        <img src="/1.webp" className="w-80 h-40"></img>
      </div>

      <div
        className="w-90 h-60 bg-gray-200 mt-5 "
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
        <div className="text-white text-2xl">교환소 {">"}</div>
        <img src="/1.webp" className="w-80 h-40"></img>
      </div>
    </div>
  );
};

export default IndexPage;