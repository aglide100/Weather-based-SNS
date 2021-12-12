import { useRouter } from "next/router";
import React, { useState, ReactElement, useEffect } from "react";
import { TodayWeatherData, WeatherProps } from "../../test/TodayWeaherData";
import WeatherIcon from "../../components/WeatherIcon";
import { Button } from "../../components/Button";
import axios, { Axios } from "axios";
import { PostProps } from "../../../pkg/core/api/v1/common";

const Post: React.FC<{}> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todayWeather, setTodayWeaher] = useState<WeatherProps>();
  const [weatherElement, setWeatherElement] = useState<ReactElement>();
  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [Btag, setBtag] = useState([]);
  const [Utag, setUtag] = useState([]);
  const [postdata, setPostdata] = useState<PostProps>();

  let content: ReactElement;

  useEffect(() => {
    if (router.isReady && !isLoading) {
      // 로딩이 다 되었다면!
      // weather, fetch

      // let postdata_: PostProps; // 게시물 정보
      // let Btag_ = Array(),
      //   Utag_ = Array(); // 기본태그, 사용자태그
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

      axios
        .get(
          "https://wbsnsapi.non-contact-karaoke.xyz/api/v1/post/" +
            router.query.id
        )
        .then((res: any) => {
          if (res.data != undefined) {
            let response = res.data;
            // res는 [PostProps, {}, {}] 형식으로 되어있음

            if (response == undefined) {
              alert("Err!");

              router.push("/");
            }
            
            setPostdata(response[0]);
            setBtag(response[1]);
            setUtag(response[2]);
            

            setIsLoading(true);

            setWeatherElement(weather);
          }
        })
        .catch((err) => {
          alert("Error! :" + err);
          router.push("/");
        });
    }
  });

  if (isLoading && postdata != undefined) {
    content = (
      <div className="p-7">
        {" "}
        👔
        <div className="w-full flex flex-col mt-5 h-16 justify-center border-2 shadow rounded-md ">
          <div className="flex flex-row justify-around w-full items-center">
            <div className="flex text-xl ml-5" style={{ width: "600%" }}>
              {postdata.post_title}
            </div>
            <div className="flex flex-row items-center w-full">
              <img className="w-3 h-3 mr-1" src="/like.png" />
              <span className="text-xs">{postdata.post_like_count}</span>
            </div>

            <div className="flex flex-row items-center w-full">
              <img className="w-3 h-3 mr-1" src="/usefull.png" />
              <span className="text-xs">{postdata.post_useful_count}</span>
            </div>
            <div className="flex flex-row items-center w-full">
              <img className="w-3 h-3 mr-1" src="/싫어요.png" />
              <span className="text-xs">
                {postdata.post_dislike_count}
              </span>
            </div>
            <div className="flex flex-row items-center w-full">
              <img className="w-3 h-3 mr-1" src="/사용자2.png" />
              <span className="text-xs">{postdata.post_view_count}</span>
            </div>

            <hr />
          </div>
        </div>
        <div className="w-full flex flex-col mt-3 h-12 justify-center border-2 shadow rounded-md ">
          <div className="flex flex-row justify-around w-full items-center">
            <div className="flex flex-row items-center w-full">
              <img className="w-5 h-5 ml-5" src="/사용자.png" />
              <span className="ml-2 mr-2">
                {/* {props.user_name} 어? 없는데? */} 이동휘
              </span>
              <Button
                size={"medium"}
                color={isFollow ? "white" : "purple"}
                onClick={(e) => {}}
              >
                {isFollow ? "팔로우" : "팔로우 취소"}
              </Button>
            </div>
            <div className="flex flex-col w-40 item-center">
              <span className="text-xs">{postdata.post_written_date}</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row mt-5 h-40 justify-between ">
          <div className="absoulte flex flex-col ml-5">
            {isLoading ? <>{weatherElement}</> : <></>}
          </div>
          <div className="w-70 flex flex-col mt-5  h-20 justify-center">
            <div className="flex flex-col mt-2 ml-3 text-xs">기본태그</div>
            <div className="flex flex-col  p-2 text-xl">
              {Btag != undefined ? (
                Btag.map((tag) => {
                  // 기본태그 연사
                  <a>#{tag.tagname}</a>;
                })
              ) : (
                <></>
              )}
            </div>
            {/* <div className="flex flex-col  p-2 text-xl">#코트 #맨투맨</div> */}
            <div className="flex flex-col mt-2 ml-3 text-xs">사용자태그</div>
            <div className="flex flex-col  p-2 text-xl">
              {Utag != undefined ? (
                Utag.map((tag) => {
                  // 사용자태그 연사
                  <a>#{tag.tagname}</a>;
                })
              ) : (
                <></>
              )}
            </div>
            {/* <div className="flex flex-col  p-2 text-xl">#겨울 #추워 #ootd</div> */}
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
          <div className="p-5">{postdata.post_content}</div>
        </div>
      </div>
    );
  } else {
    content = <>Loading....</>;
  }

  return <>{content}</>;
};

export default Post;