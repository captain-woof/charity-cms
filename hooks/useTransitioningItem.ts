import { useEffect, useState } from "react";

interface ReturnVals<T>{
  currentIndex: number
  currentItem: T
}

export default function useTransitioningItem<T>(items: Array<T>, delayInSec: number): ReturnVals<T> {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Advances index forwards after certain delay
  useEffect(() => {
    const intervalHandle = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, delayInSec * 1000);
    return () => {
      clearInterval(intervalHandle);
    };
  }, [delayInSec, items]);

  // Return current index
  return { currentIndex, currentItem: items[currentIndex] }
}
