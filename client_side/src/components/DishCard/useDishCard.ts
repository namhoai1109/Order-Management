import { useState } from 'react';

const useDishCard = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const clickToShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return {
    showDescription,
    clickToShowDescription,
    openModal,
    toggleModal,
  };
};

export default useDishCard;
