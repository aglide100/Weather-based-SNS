import { useRouter } from "next/router";
import React, { useState, ReactElement, useEffect } from "react";
import { TodayWeatherData, WeatherProps } from "../../test/TodayWeaherData";
import {
  AdvertiseHistoryProps,
  AdvertiseProps,
} from "../../../pkg/core/api/v1/common";
import WeatherIcon from "../../components/WeatherIcon";
import { Button } from "../../components/Button";
import axios from "axios";
import { argv } from "process";

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

type AdhistoryListItemProps = AdvertiseHistoryProps & AdvertiseProps;

const AdhistoryListItem = (props: AdhistoryListItemProps) => {
  return (
    <li>
      <tbody className="text-sm divide-y divide-gray-100">
        <tr>
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center">
              <div className="font-medium text-gray-800">{props.ad_no}</div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left">관고 네임</div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">
              2021-11-01 ~ 2022-10-31
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-center font-medium">30000000</div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-center">신용카드</div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-center">25000</div>
          </td>
        </tr>
      </tbody>
    </li>
  );
};

const AdminPage: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [todayWeather, setTodayWeaher] = useState<WeatherProps>();
  //   const [weatherElement, setWeatherElement] = useState<ReactElement>();
  const [adhistoryList, setAdhistoryList] = useState<AdvertiseHistoryProps[]>(
    []
  );
  const [adList, setAdList] = useState<AdvertiseProps[]>([]);
  let adListElemt: ReactElement[];
  let adMemo = new Array();
  useEffect(() => {
    if (router.isReady || !isLoading) {
      // weather, fetch
      console.log("router query", router.query);
      let dataList = new Array();
      axios
        .get(
          "https://wbsnsapi.non-contact-karaoke.xyz/api/v1/adhistory/" +
            router.query.id
        )
        .then((res) => {
          if (res.data != undefined) {
            res.data.map((arg) => {
              let data: AdvertiseHistoryProps = {
                ad_no: arg.ad_no,
                ad_cost: arg.ad_cose,
                ad_impre_count: arg.ad_impre_count,
                ad_pay_method: arg.ad_pay_method,
                com_no: arg.com_no,
              };

              dataList.push(data);
            });
            adMemo.map((memo) => {
              if (memo == res.data.ad_no) {
                // passed
              } else {
                return res.data.ad_no;
              }
            });
          }

          adMemo.map((ad) => {
            let adDataArray = new Array();
            axios
              .get("https://wbsnsapi.non-contact-karaoke.xyz/api/v1/ad/" + ad)
              .then((res) => {
                let ad: AdvertiseProps = {
                  ad_no: res.data.ad_no,
                  ad_location: res.data.ad_location,
                  ad_content: res.data.ad_content,
                  ad_start_date: res.data.ad_start_date,
                  ad_end_date: res.data.ad_end_date,
                };
                adDataArray.push(ad);
              })
              .finally(() => {
                setAdList(adDataArray);
              });
          });
        })
        .finally(() => {
          setAdhistoryList(dataList);

          setIsLoading(true);
        });
    }
  });

  if (isLoading) {
    adListElemt = adhistoryList.map((arg, index) => {
      let adDetail = adList.find((ad) => (ad.ad_no = arg.ad_no));

      return (
        <AdhistoryListItem
          key={"adhistory_" + index}
          {...arg}
          {...adDetail}
        ></AdhistoryListItem>
      );
    });
  } else {
    adListElemt = [<>Loading....</>];
  }

  return (
    <div className="w-screen flex flex-row justify-start">
      <nav className="flex flex-col bg-purple-900 w-64 h-screen px-4 tex-gray-900 border border-purple-900">
        {nav}
      </nav>
      {adListElemt}
    </div>
  );
};

export default AdminPage;
