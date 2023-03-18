import { useState } from 'react';

const useDishCard = () => {
  const [showDescription, setShowDescription] = useState(false);
  const clickToShowDescription = () => {
    setShowDescription(!showDescription);
  };

  return {
    showDescription,
    clickToShowDescription,
  };
};

export default useDishCard;
