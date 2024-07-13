// AnimatedSequence.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoundedButton } from '../../utils/common/RoundedButton';

interface AnimationControlProps {
  goToPreviousComponent: () => void;
  goToNextComponent: () => void;
  currentIndex: number;
  componentsLength: number;
  hideControls?: boolean;
  showControls?: boolean;
}

const AnimationControl = ({ goToPreviousComponent, goToNextComponent, currentIndex, componentsLength, hideControls, showControls }: AnimationControlProps) => {
  return (
    hideControls || !showControls ? null :
    <div className='fixed bottom-0 w-100 flex justify-center mx-auto gap-10 text-center left-1/2 -translate-x-1/2'>
      <RoundedButton onClick={goToPreviousComponent} disabled={currentIndex === 0} className="rounded-3xl">
        Back
      </RoundedButton>
      <RoundedButton onClick={goToNextComponent} disabled={currentIndex === componentsLength - 1} className="rounded-3xl">
        Next
      </RoundedButton>
    </div>
  );
};

interface AnimatedSequenceProps {
  components: Array<{ component: React.ReactElement; autoNext?: boolean; duration?: number; hideControls?: boolean }>;
  show_animation_control_delay?: number; // in seconds
}

const AnimatedSequence = ({ components }: AnimatedSequenceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const currentComponent = components[currentIndex];
    if (currentComponent.autoNext) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, components.length - 1));
      }, currentComponent.duration || 2000); // default duration 2000ms
      return () => clearTimeout(timer);
    }
  }, [currentIndex, components]);

  useEffect(() => {
    const currentComponent = components[currentIndex];

    if (currentComponent?.show_animation_control_delay && currentComponent?.show_animation_control_delay > 0) {
      const timer = setTimeout(() => {
        setShowControls(true);
      }, currentComponent?.show_animation_control_delay * 1000);
      return () => {clearTimeout(timer);setShowControls(false)};
    } else {
      setShowControls(true);
    }
  }, [currentIndex, components]);

  const goToNextComponent = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, components.length - 1));
  };

  const goToPreviousComponent = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className='w-full'>
      <AnimatePresence mode="wait" >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {React.cloneElement(components[currentIndex].component, { goToNextComponent, goToPreviousComponent })}
          <AnimationControl
            goToNextComponent={goToNextComponent}
            goToPreviousComponent={goToPreviousComponent}
            hideControls={components[currentIndex].hideControls}
            showControls={showControls}
            componentsLength={components.length}
            currentIndex={currentIndex}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSequence;
