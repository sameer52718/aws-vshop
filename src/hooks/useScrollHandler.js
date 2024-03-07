import { useState, useEffect } from 'react';

const useScrollHandler = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldFixHeader = scrollY > 20; 

      setIsHeaderFixed(shouldFixHeader);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isHeaderFixed;
};

export default useScrollHandler;
