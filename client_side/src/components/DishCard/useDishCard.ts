import { useState } from 'react';

const useDishCard = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const clickToShowDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleTooltip = () => {
    setOpenTooltip(!openTooltip);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
    setOpenTooltip(false);
  };

  return {
    showDescription,
    clickToShowDescription,
    openModal,
    openTooltip,
    toggleModal,
    toggleTooltip
  };
};

export default useDishCard;
