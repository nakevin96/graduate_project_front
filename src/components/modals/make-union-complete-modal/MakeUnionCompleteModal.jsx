import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import {
  THEME_MAIN_COLOR,
  THEME_MAIN_COLOR_HOVER,
} from '../../../assets/colors';

const MakeUnionCompleteModal = ({ isOpen, handleModalClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleModalClose}>
        <div className="px-12 py-12 bg-[#27262C] flex flex-col justify-center items-center">
          <p className="mb-2 text-white font-bold text-2xl">
            유니온생성이 완료되었습니다!
          </p>
          <Link to="/unionDetail">
            <div
              onClick={handleModalClose}
              className={`text-white font-semibold bg-[${THEME_MAIN_COLOR}] py-2 px-7 mt-6 rounded-lg
          cursor-pointer hover:bg-[${THEME_MAIN_COLOR_HOVER}]`}
            >
              유니온으로 이동
            </div>
          </Link>
        </div>
      </Dialog>
    </div>
  );
};

export default MakeUnionCompleteModal;