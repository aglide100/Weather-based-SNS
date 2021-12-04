import React, { useRef, useState, useEffect, ReactElement } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "../../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { TagDumpData } from "../../test/TagDumpData";
import classNames from "classnames";
import { useRouter } from "next/router";
import { TodayWeatherData, WeatherProps } from "../../test/TodayWeaherData";
import WeatherIcon from "../../components/WeatherIcon";

type TagPopUpProps = {
  isBaseClick: boolean;
  isCustomClick: boolean;
  onClickCloseButton(e): void;
  onChageClickedTag(tag: any): void;
};

type CategoryList = "cloth" | "food" | "daily" | "etc" | string;

const TagPopUp: React.FC<TagPopUpProps> = (props: TagPopUpProps) => {
  let popUpContent: ReactElement;
  const [inputValue, setInputValue] = useState<string>("");
  const [selectTag, setSelectTag] = useState<string[]>([]);

  function onClickTagHandle(tag: string) {
    const data = selectTag;
    data.push(tag);
    setSelectTag([...data]);
    props.onChageClickedTag(selectTag);
  }

  function onClickDeleteTagHandle(clickedTag: string) {
    setSelectTag((selectTag) => selectTag.filter((tag) => tag != clickedTag));
    props.onChageClickedTag(selectTag);
  }

  let tagList;
  let selectedTagList;
  if (selectTag != undefined || selectTag != null) {
    selectedTagList = selectTag.map((tag, index) => {
      if (tag.includes(inputValue)) {
        if (index == 0) {
          return (
            <span
              className="text-sm z-20"
              onClick={(e) => {
                e.preventDefault();
                onClickDeleteTagHandle(tag);
              }}
              key={"tag_" + index}
            >
              {"#" + tag}
            </span>
          );
        } else {
          return (
            <span
              className="text-sm z-20"
              key={"tag_" + index}
              onClick={(e) => {
                e.preventDefault();
                onClickDeleteTagHandle(tag);
              }}
            >
              {", #" + tag}
            </span>
          );
        }
      }
    });
  }

  if (props.isBaseClick) {
    popUpContent = <>기본태그</>;
    tagList = TagDumpData.map((tag, index) => {
      if (tag.includes(inputValue)) {
        if (index == 0) {
          return (
            <span
              className="text-gray-400 text-sm"
              onClick={(e) => {
                e.preventDefault();
                onClickTagHandle(tag);
              }}
              key={"tag_" + index}
            >
              {"#" + tag}
            </span>
          );
        } else {
          return (
            <span
              className="text-gray-400 text-sm"
              key={"tag_" + index}
              onClick={(e) => {
                e.preventDefault();
                onClickTagHandle(tag);
              }}
            >
              {", #" + tag}
            </span>
          );
        }
      }
    });
  }

  if (props.isCustomClick) {
    popUpContent = <>사용자 태그</>;
  }
  //   if (
  //     TagDumpData != null ||
  //     TagDumpData == undefined ||
  //     Object.keys(TagDumpData).length === 0
  //   ) {
  //     tagList = <div></div>;
  //   } else {

  //   }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute w-5/12 h-80 z-30 flex justify-center flex-col"
    >
      <div className="absolute w-full h-80 border-4 border-blue-300  bg-white rounded-lg flex flex-col justify-between">
        <div>{popUpContent}</div>
        <div>{tagList}</div>
        <div>{selectedTagList}</div>
        <div>
          <input
            type="text"
            name="postTitle"
            className="w-full border"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="#"
          />
        </div>
        <div className="w-full flex justify-center">
          <Button
            type={"button"}
            color={"purple"}
            isDisabled={false}
            size={"medium"}
            onClick={props.onClickCloseButton}
          >
            닫기
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const CreatePostPage: React.FC<{}> = () => {
  const router = useRouter();
  let initCategory: CategoryList;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopUpOpend, setIsPopUpOpend] = useState<boolean>(false);
  const [isBaseClick, setIsBaseClick] = useState<boolean>(false);
  const [isCustomClick, setIsCustomClick] = useState<boolean>(false);
  const [todayWeather, setTodayWeaher] = useState<WeatherProps>();
  const [selectTag, setSelectTag] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<CategoryList>();
  const [weatherElement, setWeatherElement] = useState<ReactElement>();

  const [baseTag, setBaseTag] = useState([]);
  const [customTag, setCustomTag] = useState([]);

  const [postTitle, setPostTitle] = useState<string>("");

  function onClickDeleteTagHandle(clickedTag: string) {
    setSelectTag((selectTag) => selectTag.filter((tag) => tag != clickedTag));
  }

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

  let tagList;
  if (selectTag != undefined || selectTag != null) {
    tagList = selectTag.map((tag, index) => {
      if (index == 0) {
        return (
          <span
            className="text-gray-400 text-sm underline "
            onClick={(e) => {
              e.preventDefault();
              onClickDeleteTagHandle(tag);
            }}
            key={"tag_" + index}
          >
            {"#" + tag}
          </span>
        );
      } else {
        return (
          <span
            className="text-gray-400 text-sm underline "
            key={"tag_" + index}
            onClick={(e) => {
              e.preventDefault();
              onClickDeleteTagHandle(tag);
            }}
          >
            {", #" + tag}
          </span>
        );
      }
    });
  }

  const wrapperRef = useRef(null);

  function useCheckOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsBaseClick(false);
          setIsCustomClick(false);
          setIsPopUpOpend(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useCheckOutsideClick(wrapperRef);

  function onClickCloseButton(e) {
    setIsBaseClick(false);
    setIsCustomClick(false);
    setIsPopUpOpend(false);
  }

  function handleEditorChange(value, event) {
    setContent(value);
  }

  function onClickedSelectTag(taglist: any) {
    console.log(tagList);
    setSelectTag(taglist);
  }

  return (
    <div className="flex flex-col items-center p-10 text-2xl ">
      <div className="w-full mb-1 flex flex-row">
        <input
          type="text"
          name="postTitle"
          className="w-full h-20 border-2 shadow-md rounded hover:bg-gray-200 duration-75"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요"
        />
        <div className="absoulte flex flex-col">
          {isLoading ? <>{weatherElement}</> : <></>}
        </div>
      </div>
      <div className="w-full flex flex-row justify-start mb-6">
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

      <div className="w-full flex flex-col flex-start">
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div ref={wrapperRef}>
            {isBaseClick || isCustomClick ? (
              <TagPopUp
                isBaseClick={isBaseClick}
                onClickCloseButton={onClickCloseButton}
                isCustomClick={isCustomClick}
                onChageClickedTag={onClickedSelectTag}
              />
            ) : (
              ""
            )}
          </motion.div>
        </AnimatePresence>
        <div
          className="w-full mb-10 h-14 border-2 shadow-md rounded hover:bg-gray-200 duration-75 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsBaseClick(true);
          }}
        >
          <div className="ml-1 text-sm"># 기본태그</div>
          <span>{tagList}</span>
        </div>

        <div
          className="w-full mb-10 h-14 border-2 shadow-md rounded hover:bg-gray-200 duration-75 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setIsCustomClick(true);
          }}
        >
          <div className="ml-1 text-sm"># 사용자태그</div>

          {/* <span>{tagList}</span> */}
        </div>
      </div>
      <div className="w-full border border-solid border-bombard_gray-3 p-2 shadow-md rounded-2px">
        <Editor
          options={{ minimap: { enabled: false } }}
          height="300px"
          defaultLanguage="markdown"
          defaultValue="내용을 입력해주세요!"
          onChange={handleEditorChange}
        />
      </div>
      <div className="w-full flex justify-end mt-5 mr-5">
        <Button
          type={"button"}
          color={"white"}
          isDisabled={false}
          size={"medium"}
          onClick={(e) => {}}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPage;
