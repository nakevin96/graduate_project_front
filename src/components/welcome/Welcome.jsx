import { Link } from 'react-router-dom';
import PersonAnimation from '../person-animation/PersonAnimation';
// import { SiEthereum } from 'react-icons/si';
// import { BsInfoCircle } from 'react-icons/bs';
//
// import { Loader } from '../loader';
// import { useState } from 'react';

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     step="0.0001"
//     value={value}
//     onChange={e => handleChange(e, name)}
//     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent
//     text-white border-none text-sm white-glassmorphism"
//   />
// );

const Welcome = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const handleSubmit = () => {};
  return (
    <div className="overflow-auto scrollbar-hide flex w-full justify-center items-center">
      <div className="flex flex-col wf:flex-row items-center justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-4xl text-white py-1">
            암호화폐와 함께 <br /> 돈을 모아보세요!
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            A big money raising platform, CREDIT UNION
            <br />
            Let's save up money together!
          </p>
          <button
            type="button"
            className="flex flex-row justify-center items-center
                    my-5 bg-[#0ea5e9] rounded-full cursor-pointer hover:bg-[#0284c7]"
          >
            <Link to="/union">
              <p className="px-24 py-3 text-white text-base font-semibold">
                유니온 시작하기
              </p>
            </Link>
          </button>
          {/*<div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">*/}
          {/*  <div className={`rounded-tl-2xl ${commonStyles}`}>Ethereum</div>*/}
          {/*  <div className={commonStyles}>some</div>*/}
          {/*  <div className={`rounded-br-2xl ${commonStyles}`}>*/}
          {/*    characteristic*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="w-[28rem]">
          <PersonAnimation />
        </div>

        {/*<div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">*/}
        {/*  <div*/}
        {/*    className="p-3 justify-end items-start flex-col rounded-xl h-40*/}
        {/*      sm:w-72 w-full my-5 eth-card white-glassmorpism"*/}
        {/*  >*/}
        {/*    <div className="flex justify-between flex-col w-full h-full">*/}
        {/*      <div className="flex justify-between items-start">*/}
        {/*        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">*/}
        {/*          <SiEthereum fontSize={21} color="#fff" />*/}
        {/*        </div>*/}
        {/*        <BsInfoCircle fontSize={16} color="#fff" />*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <p className="text-white font-light text-sm">Address</p>*/}
        {/*        <p className="text-white font-semibold text-lg mt-1">*/}
        {/*          Ethereum*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">*/}
        {/*    <Input*/}
        {/*      placeholder="Address To"*/}
        {/*      name="addressTo"*/}
        {/*      type="text"*/}
        {/*      handleChange={() => {}}*/}
        {/*    />*/}
        {/*    <Input*/}
        {/*      placeholder="Amount (ETH)"*/}
        {/*      name="amount"*/}
        {/*      type="number"*/}
        {/*      handleChange={() => {}}*/}
        {/*    />*/}
        {/*    <Input*/}
        {/*      placeholder="Keyword (Gif)"*/}
        {/*      name="keyword"*/}
        {/*      type="text"*/}
        {/*      handleChange={() => {}}*/}
        {/*    />*/}
        {/*    <Input*/}
        {/*      placeholder="Enter Message"*/}
        {/*      name="message"*/}
        {/*      type="text"*/}
        {/*      handleChange={() => {}}*/}
        {/*    />*/}
        {/*    <div className="h-[1px] w-full bg-gray-400 my-2" />*/}
        {/*    {isLoading ? (*/}
        {/*      <Loader />*/}
        {/*    ) : (*/}
        {/*      <button*/}
        {/*        type="button"*/}
        {/*        onClick={handleSubmit}*/}
        {/*        className="text-white w-full mt-2 */}
        {/*                border-[1px] p-2 border-[#fff] rounded-full cursor-pointer"*/}
        {/*      >*/}
        {/*        Send Now*/}
        {/*      </button>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Welcome;