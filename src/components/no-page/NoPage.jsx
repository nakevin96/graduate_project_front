import { Link } from 'react-router-dom';
import { THEME_MAIN_COLOR, THEME_MAIN_COLOR_HOVER } from '../../assets/colors';

const NoPage = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center flex-col bg-no-page">
      <p className="text-6xl text-white font-bold">404</p>
      <p className="text-xl text-white">존재하지 않는 페이지입니다.</p>
      <Link className="my-4" to="/">
        <span
          className={`text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 px-8 mx-4 rounded-full 
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
        >
          홈으로
        </span>
      </Link>
    </div>
  );
};

export default NoPage;