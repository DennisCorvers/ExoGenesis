import React, { useEffect, useMemo, useRef } from 'react';
import './ProgressBar.css'

interface ProgressBarProps {
  current: number;
  total: number;
  enableProgressBars?: boolean;
  isAnimated?: boolean;
  isReversed?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  enableProgressBars = true,
  isAnimated = true,
  isReversed = false }) => {
  const innerBarRef = useRef<HTMLDivElement | null>(null);

  const widthStyle = useMemo(() => {
    const progress = (current / total) * 100;
    const percent = isReversed ? 100 - progress : progress;
    return { width: `${percent}%` };
  }, [current, total, isReversed]);

  const animationStyle = useMemo(() => {
    const delay = -current;
    const duration = total;
    return {
      animation: `${duration}s linear ${delay}s 1 progressBar`,
      animationDirection: isReversed ? 'reverse' : 'normal',
    };
  }, [current, total, isReversed]);

  useEffect(() => {
    if (enableProgressBars && isAnimated && innerBarRef.current) {

      innerBarRef.current.style.animation = 'none';
      void innerBarRef.current.offsetHeight;

      innerBarRef.current.style.animation = animationStyle.animation;
      innerBarRef.current.style.animationDirection = animationStyle.animationDirection;
    }
  }, [animationStyle, enableProgressBars, isAnimated]);

  return (
    <div className="outer-bar">
      <div
        ref={innerBarRef}
        className="inner-bar"
        style={!isAnimated ? widthStyle : undefined}
      />
    </div>
  );
};

export default ProgressBar;
