import React from "react";
import { useRouter } from "next/router";

type PromotionPost = {
    title: string; // 제목
    content: string; // 내용
    date: string; // 60%
  };


const PromotionPost: React.FC<{}> = () => {
    return(


      <div className='grid grid-cols-2 '>
        <div className='mt-10'>
        <div className=' box-content h-100 w-50
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2'>
          <div className='h-56 object-cover relative'>
            <img
              src='/교환권_갤러리아포레스트_정방향.png'
              className="object-fill"
            />
          </div>
          <div className='flex'>
          <div className='p-6'>
            <div
              className='block mt-1 text-lg leading-tight font-medium text-black'
            >
              갤러리아 포레스트 이용권
              <div className='flex flex-row mt-5 text-gray-700 '>
                <div className='w-12 h-12 object-cover relative '>
                    <img
                    src='/ticket.png'
                    className="object-fill"
                    />
                </div>
                <div className='mt-6'>
                    x8
                </div>
                <div className='text-xl text-center'>
                   재고량 50
                </div>
            </div>
            </div>
            </div>
          </div>
          </div>
          </div>
    
        <div className='mt-10'>
        <div className='box-content h-100 w-50
        m-auto bg-white rounded-xl shadow-md overflow-hidden border-2'>
        <div className='h-56 object-cover relative'>
            <img
              src='/교환권_갤러리아포레스트_정방향.png'
              className="object-fill"
            />
          </div>
          <div className='flex'>
          <div className='p-6'>
            <div
              className='block mt-1 text-lg leading-tight font-medium text-black'
            >
              갤러리아 포레스트 이용권
            </div>
            <div className='flex flex-row mt-5 text-gray-700 '>
                <div className='w-12 h-12 object-cover relative '>
                    <img
                    src='/ticket.png'
                    className="object-fill"
                    />
                </div>
                <div className='mt-6'>
                    x8
                </div>
                <div className='text-xl text-center'>
                   재고량 50
                </div>
            </div>
            

        </div>
        </div>
        </div>
        </div>
    </div>

    );
};

const ChangeTicket: React.FC<{}> = () => {
  const router = useRouter();
 
  
  return (
    <div>
      <div className="mt-10 text-2xl mx-4 font-light">교환소</div>
    <PromotionPost></PromotionPost>
    <PromotionPost></PromotionPost>
    <PromotionPost></PromotionPost>
    

  </div>

  );
};

export default ChangeTicket;