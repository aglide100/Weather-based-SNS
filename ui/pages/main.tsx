import React from "react";
import { useRouter } from "next/router";

type todayWeatherProps = {
  kind: string; // 흐림, 비, 맑음
  temp: string; // 8도
  humidity: string; // 60%
};

const dumpWeatherData: todayWeatherProps = {
  kind: "비",
  temp: "7도",
  humidity: "39%",
};

const TodayWeather: React.FC<todayWeatherProps> = (
  props: todayWeatherProps
) => {
  return (
    <div className="flex flex-col">
      <div>{props.kind}</div>
      <div className="flex flex-row">
        {" "}
        <div>습도</div>{props.humidity} {props.temp}
      </div>
    </div>
  );
};

const TagList: React.FC<{}> = () => {
  return (
    <div>
        <div className="text-2xl">👕</div>
        <div className="text-2xl">🍱</div>
        <div className="text-2xl">🤾🏻‍♂</div>
        <div className="text-2xl">✨</div>
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

const MainPage: React.FC<{}> = () => {
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
    <div className="flex flex-col w-full mt-10 bg-yellow-300">
      <div className="flex flex-row justify-around">
        <div>
          오늘의 날씨
          {/* <TodayWeather {...dumpWeatherData}></TodayWeather> */}
          <div> 21.11.16 15:00 기준</div>
          <img src="/비.png" className="w-30 h-20"></img>
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

      <div
        className="w-90 h-70 mt-5 "
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
        <div className="text-white text-2xl mx-5"> 진행중인 Event {">"}</div>
        <img src="/프로모션가로.png" className="w-60 h-30 mx-6 my-3"></img>
      </div>

      <div
        className="w-90 h-60 mt-5 "
        onClick={(event) => {
          event.preventDefault();
          router.push("/eventList");
        }}
      >
        <div className="text-white text-2xl mx-5">교환소 {">"}</div>
        <img src="/1.webp" className="w-80 h-40 mx-6 my-3"></img>
      </div>
    </div>
  );
};

export default MainPage;
