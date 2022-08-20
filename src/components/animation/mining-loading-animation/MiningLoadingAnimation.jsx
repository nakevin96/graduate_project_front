import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import miningAnimation from '../../../assets/animations/mining-loading.json';

const MiningLoadingAnimation = () => {
  const anime = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: miningAnimation,
    });
    return () => instance.destroy();
  }, [count]);
  return <div onClick={() => setCount(count + 1)} ref={anime} />;
};

export default MiningLoadingAnimation;