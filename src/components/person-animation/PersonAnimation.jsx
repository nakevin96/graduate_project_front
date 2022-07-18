import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import personAnimation from '../../assets/animations/main_people.json';

const PersonAnimation = () => {
  const anime = useRef(null);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: personAnimation,
    });
    return () => instance.destroy();
  }, []);
  return <div className="w-[32rem] h-[32rem]" ref={anime} />;
};

export default PersonAnimation;