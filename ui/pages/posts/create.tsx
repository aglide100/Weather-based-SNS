import React, { useRef, useState, useEffect, ReactElement } from "react";
import Editor from "@monaco-editor/react";
import { InputField, ValidationResult } from "../../components/InputField";
import { Button } from "../../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import { TagDumpData } from "../../test/TagDumpData";

type TagPopUpProps = {
  isBaseClick: boolean;
  isCustomClick: boolean;
  onClickCloseButton(e): void;
  onChageClickedTag(tag: any): void;
};

const TagPopUp: React.FC<TagPopUpProps> = (props: TagPopUpProps) => {
  let popUpContent: ReactElement;
  const [inputValue, setInputValue] = useState<string>("");
  const [selectTag, setSelectTag] = useState<string[]>([]);

  function onClickTagHandle(tag: string) {
    setSelectTag((old) => [...old, tag]);
    props.onChageClickedTag(selectTag);
  }

  function onClickDeleteTagHandle(clickedTag: string) {
    console.log(selectTag);
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
              className="text-gray-400 text-sm"
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
              className="text-gray-400 text-sm"
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopUpOpend, setIsPopUpOpend] = useState<boolean>(false);
  const [isBaseClick, setIsBaseClick] = useState<boolean>(false);
  const [isCustomClick, setIsCustomClick] = useState<boolean>(false);
  const [selectTag, setSelectTag] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");

  const [baseTag, setBaseTag] = useState([]);
  const [customTag, setCustomTag] = useState([]);

  const [postTitle, setPostTitle] = useState<string>("");

  function onClickDeleteTagHandle(clickedTag: string) {
    setSelectTag((selectTag) => selectTag.filter((tag) => tag != clickedTag));
  }

  let tagList;
  if (selectTag != undefined || selectTag != null) {
    tagList = selectTag.map((tag, index) => {
      if (index == 0) {
        return (
          <span
            className="text-gray-400 text-sm"
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
            className="text-gray-400 text-sm"
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
    setSelectTag(taglist);
  }

  return (
    <div className="flex flex-col items-center p-10">
      <div className="w-full mb-10">
        <input
          type="text"
          name="postTitle"
          className="w-full border"
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요"
        />
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
          className="w-full mb-10 flex flex-start"
          onClick={(e) => {
            e.preventDefault();
            setIsBaseClick(true);
          }}
        >
          <div># 기본태그</div>
          <span>{tagList}</span>
        </div>

        <div
          className="w-full mb-10"
          onClick={(e) => {
            e.preventDefault();
            setIsCustomClick(true);
          }}
        >
          <div># 사용자태그</div>
          <span>{tagList}</span>
        </div>
      </div>
      <div className="w-full  border border-solid border-bombard_gray-3 p-2 shadow-md rounded-2px">
        <Editor
          options={{ minimap: { enabled: false } }}
          height="500px"
          defaultLanguage="markdown"
          defaultValue="내용을 입력해주세요!"
          onChange={handleEditorChange}
        />
      </div>
      <div className="w-full flex justify-end mt-5 mr-5">
        <Button
          type={"button"}
          color={"purple"}
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
