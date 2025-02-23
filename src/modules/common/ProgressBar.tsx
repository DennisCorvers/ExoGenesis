import React, { useEffect, useRef } from 'react';
import './ProgressBar.css'

interface ProgressBarProps {
  elapsedTime: number;
  totalTime: number;
  enableProgressBars: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ elapsedTime, totalTime, enableProgressBars }) => {
  const innerBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enableProgressBars || !innerBarRef.current) return;

    const delay = -elapsedTime;
    const duration = totalTime;

    innerBarRef.current.style.animation = 'none';
    void innerBarRef.current.offsetHeight;

    innerBarRef.current.style.animation = `${duration}s linear ${delay}s 1 progressBar`;
}, [elapsedTime, totalTime, enableProgressBars]);

  return (
    <div className="progress-bar-container">
      <div
        ref={innerBarRef}
        className="inner-bar"
      />
    </div>
  );
};

export default ProgressBar;
