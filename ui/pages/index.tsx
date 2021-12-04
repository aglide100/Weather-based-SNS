import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

type todayWeatherProps = {
  kind:string;
  temp: string; // 8도
  humidity: string; // 60%
};

const dumpWeatherData: todayWeatherProps = {
  kind : "비",
  temp: "7도",
  humidity: "37",
};

const WeatherPhoto = [
  {
    kind : "맑음",
    image:"/sunny.png"
  },
  {
    kind : "비",
    image : "/rainy.png"
  },
  {
    kind : "흐림",
    image : "/cloudy.png"
  },
  {
    kind : "눈",
    image : "/snow.png"
  },
]

const TodayWeather: React.FC<todayWeatherProps> = (
  props: todayWeatherProps, WeatherPhoto
) => {
  return (
    <div className="flex flex-col">
      <img src="/rainy.png" className="w-40 h-30 mt-3 mx-9 my-2"></img>
      <div className="text-base mr-3 ">부산광역시 사상구</div>
        <div>
              <span className="text-sm mr-3">습도: {props.humidity}</span>
              <span className="text-base">{props.temp}</span>
        </div>
    </div>
  );
};

const TagList: React.FC<{}> = () => {
  return (
    <div>
        <div className="text-2xl mt-5">👕</div>
        <div className="text-2xl mt-5">🍱</div>
        <div className="text-2xl mt-5">🤾🏻‍♂</div>
        <div className="text-2xl mt-5">✨</div>
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
    <div className="flex flex-col w-full mt-4">
      <div className="flex flex-row justify-around">
        <div className="text-center">
          오늘의 날씨
          {/* <TodayWeather {...dumpWeatherData}></TodayWeather> */}
          <div className="text-xs"> 21.12.05 15:00 기준</div>
          <div className="text-center" >
          <TodayWeather 
            kind={dumpWeatherData.kind}
            humidity={dumpWeatherData.humidity}
            temp={dumpWeatherData.temp}
          ></TodayWeather>
          </div>
        </div>
        <div className="box-content h-100 w-40 ">
        <div className="text-center  ">추천 태그</div>
          <TagList></TagList>
        </div>
      </div>

      <div className="mt-6 mx-4">
      <div className="font-semibold">
        내가 느낀 오늘의 날씨
        <div className="flex flex-row justify-around font-light mt-1">
          {eventArray.map((data) => {
            return (
              <TodayWeatherEvent
                id={data.id}
                onClickHandler={data.onClickHandler}
              ></TodayWeatherEvent>
            );
          })}
        </div>
        </div>
      </div>


      <div
        className="w-90 h-70 bg-indigo-200 mt-5 mx-4 rounded-xl 
        overflow-hidden border-4 border-white"
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
    
        <div className="mt-1">
          <div className="text-white text-xl font-semibold mx-3"> 진행중인 Event {">"}</div>
          <img src="/프로모션가로.png" className="w-80 h-50 mt-3 mx-9 my-6"></img>
        </div>
      </div>



      <div
        className="w-90 h-70 bg-purple-300 mt-4 mx-4 rounded-xl 
        overflow-hidden border-4 border-white"
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
      <div className="mt-1"></div>
        <div className="text-white text-xl font-semibold mx-3">교환소 {">"}</div>
        <img src="/교환권_갤러리아포레스트.jpg" className="w-80 h-50 mt-3 mx-9 my-6"></img>
      </div>
    </div>
    
  );
};

export default IndexPage;
