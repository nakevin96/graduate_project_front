import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import detailLoadingAnimation from '../../../assets/animations/loading-detail.json';

const DetailLoadingAnimation = () => {
  const anime = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: detailLoadingAnimation,
    });
    return () => instance.destroy();
  }, [count]);
  return <div onClick={() => setCount(count + 1)} ref={anime} />;
};

export default DetailLoadingAnimation;