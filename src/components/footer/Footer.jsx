const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
      </div>
      <div className="flex flex-[0.3] justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Menu1
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Menu2
        </p>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">
        Come join us and hear for the unexpected miracle
      </p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@credit_union2022</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);


export default Footer;