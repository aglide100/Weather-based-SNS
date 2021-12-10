import React, { ReactComponentElement, ReactElement, useEffect, useRef, useState } from "react";
import router, { useRouter } from "next/router";
import { Button } from "../components/Button";
//import "../styles/nav.css";
import  {CompanyProps} from "../../pkg/core/api/v1/common/CompanyProps"
import  {AdvertiseHistoryProps} from "../../pkg/core/api/v1/common/AdvertiseHistoryProps"
// import  {AdvertiseProps} from "../../pkg/core/api/v1/common/AdvertiseProps"

import axios from "axios";

type compnayListItemProps = CompanyProps 
const CompanyListItme:React.FC<compnayListItemProps> =  (props: compnayListItemProps) => {

  const [adDate, setAdDate] = useState<string>("")
  const [adPaymanet, setAdPaymanet] = useState<string>("")
  const [adPrice, setAdPrice] = useState<number>(0)


  return (<>
    <tr onClick={(e) => {
      e.preventDefault();
      // for test
      router.push("/admin/~~~" + props.com_no)
    }}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="font-medium text-gray-800"></div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{props.com_name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            {adDate}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium"></div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">{adPaymanet}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">{adPrice}</div>
        </td>
      </tr>
      <tr>
    </tr></>)
}

const nav: ReactElement = (
  <div>
    <div className="flex flex-wrap mt-8">
      <div className="w-1/2">
        <img src="/user.png" className="mx-1 w-20 h-20 rounded-md" />
      </div>
      <div className="w-1/2">
        <span className="font-semibold text-white ml-1">Admin</span>
        <button className="mt-2 bg-black text-white px-4 py-2 rounded-md  hover:bg-white hover:text-black">
          로그아웃
        </button>
      </div>
    </div>
    <div className="mt-10 mb-4">
      <ul className="ml-4">
        <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-white  hover:font-bold rounded rounded-lg">
          <span>
            <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
              <path
                d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
              ></path>
            </svg>
          </span>
          <a href="#">
            <span className="ml-2">광 고 등 록</span>
          </a>
        </li>
        <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black hover:bg-white  hover:font-bold rounded rounded-lg">
          <span>
            <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                fill="currentColor"
              />
              <path
                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <a href="#">
            <span className="ml-2">광 고 업 체</span>
          </a>
        </li>
        <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black  hover:bg-white  hover:font-bold rounded rounded-lg">
          <span>
            <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
              <path
                d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                        2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                        00-2-2h-1V1m-1 11h-5v5h5v-5z"
              ></path>
            </svg>
          </span>
          <a href="#">
            <span className="ml-2">프 로 모 션</span>
          </a>
        </li>

        <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-white  hover:font-bold rounded rounded-lg">
          <span>
            <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
              <path
                d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                        4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                        9v2h-4v-2h4m2-2h-8v6h8v-6z"
              ></path>
            </svg>
          </span>
          <a href="#">
            <span className="ml-2">상 품 등 록</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

const AdminPage: React.FC<{}> = ({}) => {
  const router = useRouter();

  let companyList:ReactElement[];
  const [listData, setListData ] = useState<CompanyProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (listData != undefined)  {
    companyList = listData.map((arg, index) => {
      return <li key={"com_"+index}><CompanyListItme {...arg} ></CompanyListItme></li>
    })
  } else {
    companyList = [<></>]
  }


  useEffect(() => {
    if (!isLoading) {
      axios.get("https://wbsnsapi.non-contact-karaoke.xyz/api/v1/com/list").then((res) => {
        const list = res.data

        let comArray = new Array()
        if (list != undefined) {
          list.map((com) => {
            let newCom: CompanyProps = {
              com_no: com.com_no,
              com_name: com.com_name,
              com_phone: com.com_phone,
              com_ceo: com.com_ceo,
              com_regis_no: com.com_regis_no,
            }
            comArray.push(newCom)
          })
        }

        setListData(comArray)
        setIsLoading(true)
      })
    }
  })

  return (
    <div className="w-screen flex flex-row justify-start">
      <nav className="flex flex-col bg-purple-900 w-64 h-screen px-4 tex-gray-900 border border-purple-900">
        {nav}
      </nav>
      {companyList}
    </div>
  );
};

export default AdminPage;
