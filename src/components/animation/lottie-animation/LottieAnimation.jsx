import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import personAnimation from '../../../assets/animations/main_people.json';
import miningLoadingAnimation from '../../../assets/animations/mining-loading.json';
import detailLoadingAnimation from '../../../assets/animations/loading-detail.json';
import addProfileAnimation from '../../../assets/animations/add-profile.json';

export const animationNameList = {
  personMain: 'PERSON_MAIN',
  miningLoading: 'MINING_LOADING',
  detailLoading: 'DETAIL_LOADING',
  addProfile: 'ADD_PROFILE',
};

const animationList = {
  PERSON_MAIN: personAnimation,
  MINING_LOADING: miningLoadingAnimation,
  DETAIL_LOADING: detailLoadingAnimation,
  ADD_PROFILE: addProfileAnimation,
};

const LottieAnimation = ({ animationName, loopBool }) => {
  const anime = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: loopBool,
      autoplay: true,
      animationData: animationList[animationName],
    });
    return () => instance.destroy();
  }, [count]);
  return <div onClick={() => setCount(count + 1)} ref={anime} />;
};

export default LottieAnimation;