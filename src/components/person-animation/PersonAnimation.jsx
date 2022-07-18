import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import personAnimation from '../../assets/animations/main_people.json';

const PersonAnimation = () => {
  const anime = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: personAnimation,
    });
    return () => instance.destroy();
  }, [count]);
  return <div onClick={() => setCount(count + 1)} ref={anime} />;
};

export default PersonAnimation;