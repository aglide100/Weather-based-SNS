import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PostProps } from "../../pkg/core/api/v1/common/PostProps";
import { PostDumpDatas } from "../test/PostDumpDatas";
import { WeatherIcon } from "../components/WeatherIcon";
import classNames from "classnames";
type PostItemProps = PostProps & {
  onClickPost(e): void;
};
type CategoryList = "cloth" | "food" | "daily" | "etc" | string;
const PostItem: React.FC<PostItemProps> = (props: PostItemProps) => {
  return (
    <div
      onClick={props.onClickPost}
      className="w-full flex flex-col mt-3 h-16 justify-center border-2 shadow rounded-md hover:bg-gray-200 duration-75 cursor-pointer "
    >
      <div className="flex flex-row justify-around w-full items-center">
        <div className="ml-2">
          <div className="w-6 h-6">
            <WeatherIcon icon={props.post_weather} />
          </div>
        </div>

        <div className="flex w-full  ml-3">썸네일</div>
        <div className="flex  -mr-1 text-xs " style={{ width: "200%" }}>
          {props.post_title}
        </div>
        <div className="flex flex-row items-center w-full">
          <img className="w-3 h-3 mr-2" src="/like.png" />
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

type userProps = {
    follower: string;
    follower_cnt: number;
    following: string;
    following_cnt:number;
}
type userGradeProps = {
  nickname: string;
    photo: string;
    grade: string;
}
const dumpUserData: userProps = {
  follower: "팔로워",
  follower_cnt: 92,
  following: "팔로잉",
  following_cnt: 42,
};

const dumpGradeData: userGradeProps = {
  nickname: "이동휘",
  photo: "",
  grade: "Green",
};

const User: React.FC<userProps> = (
  props: userProps
) => {
  return(
    <div className="flex flex-col">
      <div className="flex flex-row">
        {props.follower} {props.following}        
      </div>
    </div>
  );
};

const Grade: React.FC<userGradeProps> = (
  props: userGradeProps
) => {
  return(
    <div className="flex flex-col text-center mt-5">
      <div className="text-xl">{props.nickname}</div>
      <div className="border-2 shadow rounded-m"><img src="우수회원 (1).png" width="150px"></img></div>
    </div>
  ); 
};


const MyPage: React.FC<{}> = () => {
    const router = useRouter();
    const categoryArray = new Array();
    const [selectCategory, setSelectCategory] = useState<CategoryList>();

    const [isLoading, setIsLoading] = useState(false);
    const [postList, setPostList] = useState<ReactElement[]>([]);
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
                  onClickPost(post.post_no);
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
        <div className="flex flex-col w-full mt-10 ">
          <div className="flex flex-row justify-around">
            <div className="justify-center border-2 shadow rounded-md">
            <img src="/2.jpg" className="w-40 h-40 "></img> 
            <div>
              <div className="flex flex-row">
          <div className="w-full flex flex-col h-16 text-center border-2 shadow rounded-md">
          <div className="flex flex-col p-1 text-xs">
            팔로우
          </div>
          <div className="flex flex-col  p-1 text-xl">
            83
          </div>
          </div>
          <div className="w-full flex flex-col h-16 text-center border-2 shadow rounded-md">
                  
          <div className="flex flex-col p-1 text-xs">
            팔로워
          </div>
          <div className="flex flex-col  p-1 text-xl">
            102
          </div>
          </div>
          </div>
        </div>
        </div>

            <div>
              <Grade
                nickname={dumpGradeData.nickname}
                photo={dumpGradeData.photo}
              ></Grade>
            </div>
          </div>
          <div>
            <div
              className="w-90 h-80 mt-5"
              >
                 <div>
                 <div className="w-full flex flex-row justify-around mb-6">
    <div
      className={classNames("", {
        "opacity-50": selectCategory === "cloth",
      })}
      onClick={(e) => {
        e.preventDefault();

        setSelectCategory("cloth");
      }}
    >
      👔
      {/* <img src="/cloth.png" className="w-8 h-8" /> */}
    </div>
    <div
      className={classNames("", {
        "opacity-50": selectCategory === "food",
      })}
      onClick={(e) => {
        e.preventDefault();

        setSelectCategory("food");
      }}
    >
      🍱
      {/* <img src="/food.png" className="w-8 h-8" /> */}
    </div>
    <div
      className={classNames("", {
        "opacity-50": selectCategory === "daily",
      })}
      onClick={(e) => {
        e.preventDefault();

        setSelectCategory("daily");
      }}
    >
      🤾
      {/* <img src="/daily.png" className="w-8 h-8" /> */}
    </div>
    <div
      className={classNames("", {
        "opacity-50": selectCategory === "etc",
      })}
      onClick={(e) => {
        e.preventDefault();

        setSelectCategory("etc");
      }}
    >
      ✨{/* <img src="/etc.png" className="w-8 h-8" /> */}
    </div>
  </div>
     
      <div className="w-full h-full flex flex-col">
      <div>{router.query.category}</div>
      <hr />
      <div className="relative">
        {!isLoading ? (
          <span>로딩중입니다!</span>
        ) : (
          <ul className="w-full">
            {postList}

          </ul>
        )}
      </div>
    </div>
      </div>
              </div>
          </div>
          
        </div>
      );
};

export default MyPage;