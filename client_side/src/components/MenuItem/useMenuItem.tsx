import { CarouselRef } from 'antd/es/carousel';
import { useEffect, useRef, useState } from 'react';

const useMenuItem = (lengthSlide: number) => {
  const sliderRef = useRef<CarouselRef>(null);

  const [showBtn, setShowBtn] = useState({
    prev: false,
    next: true,
  });

  const [countNext, setCountNext] = useState(1);

  useEffect(() => {
    if (countNext === 1) {
      setShowBtn({
        prev: false,
        next: true,
      });
    } else if (countNext * 6 >= lengthSlide) {
      setShowBtn({
        prev: true,
        next: false,
      });
    } else {
      setShowBtn({
        prev: true,
        next: true,
      });
    }
  }, [countNext]);

  const slideToLeft = () => {
    sliderRef.current?.prev();
    setCountNext(countNext - 1);
  };

  const slideToRight = () => {
    sliderRef.current?.next();
    setCountNext(countNext + 1);
  };

  return { sliderRef, showBtn, slideToLeft, slideToRight };
};

export default useMenuItem;
