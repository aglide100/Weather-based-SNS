import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { PostProps } from "../../../pkg/core/api/v1/common/PostProps";
import { PostDumpDatas } from "../../test/PostDumpDatas";
import { WeatherIcon } from "../../components/WeatherIcon";
import * as axios from "axios";

type PostItemProps = PostProps & {
  onClickPost(e): void;
};

const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  return (
    <div
      onClick={props.onClickPost}
      className="w-full flex flex-col mt-3 h-16 justify-center border-2 shadow rounded-md hover:bg-gray-200 duration-75 cursor-pointer"
    >
      <div className="flex flex-row justify-around w-full items-center">
        <div className="ml-2">
          <div className="w-6 h-6">
            <WeatherIcon icon={props.post_weather} />
          </div>
        </div>

        <div className="flex ml-5 -mr-1 text " style={{ width: "230%" }}>
          {props.post_title}
        </div>
        <div className="flex flex-row items-center w-full">
          <img className="ml-6 w-3 h-3 mr-2" src="/like.png" />
          <span className="text-xs">{props.post_like_count}</span>
        </div>

        <div className="flex flex-row items-center w-full">
          <img className="w-3 h-3 mr-1" src="/usefull.png" />
          <span className="text-xs">{props.post_useful_count}</span>
        </div>

        <div className="w-full text-xs mr-1">{props.post_written_date}</div>

        <hr />
      </div>
    </div>
  );
};

const PostPageList: React.FC<{}> = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postList, setPostList] = useState([]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     fetchPostList();
  //   }
  // }, []);
  // function fetchPostList() {
  //   const axiosObj = axios.default;
  //   axiosObj.get("https://wbsnsapi.non-contact-karaoke.xyz/api/v1/post/list").then((response) => {
  //     setPostList(response.data);
  //     setIsLoading(true);
  //     });
  //   }
  function onClickPost(post_no: string) {
    router.push("/posts/" + post_no);
  }

  useEffect(() => {
    if (router.isReady) {
      let tempPostList = PostDumpDatas.map((post, index) => {
        return (
          <li className="px-3" key={"post_" + index}>
            <PostItem
              {...post}
              onClickPost={(e) => {
                e.preventDefault();
                onClickPost(post.post_no.toString());
              }}
            ></PostItem>
          </li>
        );
      });
      setPostList(tempPostList);
      setIsLoading(true);
    }
  }, [router.isReady]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div>{router.query.category}</div>
      <hr />
      <div className="relative">
        {!isLoading ? (
          <span>로딩중입니다!</span>
        ) : (
          <ul className="w-full">
            {postList}
            <div
              onClick={(e) => {
                e.preventDefault();
                router.push("/posts/create");
              }}
              className="fixed bottom-10 h-11 w-11 z-20 rounded-full p-1 ring-4 left-3/4 sm:left-2/3"
            >
              <svg
                className="w-full h-full"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="skyblue" />
              </svg>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostPageList;
