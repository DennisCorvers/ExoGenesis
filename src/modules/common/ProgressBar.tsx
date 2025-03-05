import React, { useEffect, useRef } from 'react';
import './ProgressBar.css'

interface ProgressBarProps {
  current: number;
  total: number;
  enableProgressBars?: boolean;
  isAnimated: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  isAnimated,
  enableProgressBars }) => {
  const innerBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (enableProgressBars === false || !innerBarRef.current) {
      return;
    }

    innerBarRef.current.style.animation = 'none';
    void innerBarRef.current.offsetHeight;

    if (isAnimated) {
      const delay = -current;
      const duration = total;

      innerBarRef.current.style.animation = `${duration}s linear ${delay}s 1 progressBar`;
    }
    else {
      innerBarRef.current.style.width = `${(current / total) * 100}%`;
    }
  }, [current, total, isAnimated, enableProgressBars]);

  return (
    <div className="outer-bar">
      <div
        ref={innerBarRef}
        className="inner-bar"
      />
    </div>
  );
};

export default ProgressBar;
