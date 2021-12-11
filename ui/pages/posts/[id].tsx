import { useRouter } from "next/router";
import React, { useState, ReactElement, useEffect } from "react";
import { TodayWeatherData, WeatherProps } from "../../test/TodayWeaherData";
import WeatherIcon from "../../components/WeatherIcon";
import { Button } from "../../components/Button";

const Post: React.FC<{}> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todayWeather, setTodayWeaher] = useState<WeatherProps>();
  const [weatherElement, setWeatherElement] = useState<ReactElement>();
  const [isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady || !isLoading) {
      // weather, fetch
      setTodayWeaher(TodayWeatherData);

      let weather: ReactElement = (
        <div className="z-20 flex flex-col items-center">
          <div className="w-20 h-20">
            <WeatherIcon icon={TodayWeatherData.kind} />
          </div>
          <div className="flex flex-row w-full justify-around">
            <div>
              <span className="text-sm">습도: {TodayWeatherData.humidity}</span>
            </div>
            <div>
              <span className="text-base">{TodayWeatherData.temp}도</span>
            </div>
          </div>
          <div className="text-lg">{TodayWeatherData.address}</div>
        </div>
      );

      setWeatherElement(weather);

      setIsLoading(true);
    }
  });

  return (
    <div className="p-7">
      {" "}
      👔
      <div className="w-full flex flex-col mt-5 h-16 justify-center border-2 shadow rounded-md ">
        <div className="flex flex-row justify-around w-full items-center">
          <div className="flex text-xl ml-5" style={{ width: "600%" }}>
            {/* {props.post_title} */}오늘은 코트가 딱이네요
          </div>
          <div className="flex flex-row items-center w-full">
            <img className="w-3 h-3 mr-1" src="/like.png" />
            <span className="text-xs">{/* {props.post_like_count} */} 67</span>
          </div>

          <div className="flex flex-row items-center w-full">
            <img className="w-3 h-3 mr-1" src="/usefull.png" />
            <span className="text-xs">
              {/* {props.post_useful_count} */} 22
            </span>
          </div>
          <div className="flex flex-row items-center w-full">
            <img className="w-3 h-3 mr-1" src="/싫어요.png" />
            <span className="text-xs">{/* {props.post_useful_count} */} 5</span>
          </div>
          <div className="flex flex-row items-center w-full">
            <img className="w-3 h-3 mr-1" src="/사용자2.png" />
            <span className="text-xs">
              {/* {props.post_lookup_count} */} 582
            </span>
          </div>

          <hr />
        </div>
      </div>
      <div className="w-full flex flex-col mt-3 h-12 justify-center border-2 shadow rounded-md ">
        <div className="flex flex-row justify-around w-full items-center">
          <div className="flex flex-row items-center w-full">
            <img className="w-5 h-5 ml-5" src="/사용자.png" />
            <span className="ml-2 mr-2">{/* {props.user_name} */} 이동휘</span>
            <Button
              size={"medium"}
              color={isFollow ? "white" : "purple"}
              onClick={(e) => {}}
            >
              {isFollow ? "팔로우" : "팔로우 취소"}
            </Button>
          </div>
          <div className="flex flex-col w-40 item-center">
            <span className="text-xs">2021년 12월 3일</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row mt-5 h-40 justify-between ">
        <div className="absoulte flex flex-col ml-5">
          {isLoading ? <>{weatherElement}</> : <></>}
        </div>
        <div className="w-70 flex flex-col mt-5  h-20 justify-center">
          <div className="flex flex-col mt-2 ml-3 text-xs">기본태그</div>
          <div className="flex flex-col  p-2 text-xl">#코트 #맨투맨</div>
          <div className="flex flex-col mt-2 ml-3 text-xs">사용자태그</div>
          <div className="flex flex-col  p-2 text-xl">#겨울 #추워 #ootd</div>
        </div>
      </div>
      <div className="w-full flex flex-col  border-2 shadow rounded-md  mt-5  ">
        <div>
          <img
            src="/옷사진.jpg"
            width="100%"
            className="p-5 align-center"
          ></img>
        </div>
        <div className="p-5">
          오늘 코트 입고 나왔는데 딱 좋네요 다들 감기 조심하세요!
        </div>
      </div>
    </div>
  );
};

export default Post;
