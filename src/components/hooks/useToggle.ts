import { useState } from 'react';

const useToggle = (initialState: boolean = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = () => setIsToggled(!isToggled);
  const setTrue = () => setIsToggled(true);
  const setFalse = () => setIsToggled(false);

  return { isToggled, toggle, setTrue, setFalse };
};

export default useToggle;
