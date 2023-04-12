import { useState } from 'react';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';

function useToggle() {
    const [arrow, setArrow] = useState(faCircleLeft);
    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
        setArrow(isOpen ? faCircleLeft : faCircleRight);
    };

    return { arrow, toggle, isOpen };
}

export default useToggle;
