import React, { useEffect, useMemo, useRef } from 'react';
import { TICK_RATE } from '@game/core/Constants';
import './ProgressBar.css';

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
  isReversed = false,
}) => {
  const innerBarRef = useRef<HTMLDivElement | null>(null);

  const progress = (current / total) * 100;
  const percent = isReversed ? 100 - progress : progress;

  const widthStyle = useMemo(() => ({ width: `${percent}%` }), [percent]);

  const delay = -current;
  const duration = total - TICK_RATE / 1000;
  const animation = `${duration}s linear ${delay}s 1 progressBar`;
  const animationDirection = isReversed ? 'reverse' : 'normal';

  const computedAnimationStyle = useMemo(
    () => ({
      animation,
      animationDirection,
    }),
    [animation, animationDirection]
  );

  useEffect(() => {
    if (enableProgressBars && isAnimated && innerBarRef.current) {
      const bar = innerBarRef.current;
      bar.style.animation = 'none';

      void bar.offsetHeight;
      bar.style.animation = computedAnimationStyle.animation;
      bar.style.animationDirection = computedAnimationStyle.animationDirection;
    }
  });

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
