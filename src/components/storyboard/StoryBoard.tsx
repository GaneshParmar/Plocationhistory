import React, { useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import AnimatedSequence from './compoenents/AnimationSequence';
import WelcomeComponent from './compoenents/WelcomeBanner';
import AnotherComponent from './compoenents/ImageSlider';
import StoryBoardDateSelect from './compoenents/StoryBoardDateSelect';
import LocationHighlight from './LocationHighlight';

// Replace with your temporary image URLs


const StoryBoard = () => {

  const [userSelectedDate , setUserSelectedDate] = useState<Date|String>(new Date("06-05-2024"));
  

  const components = [
    { component: <StoryBoardDateSelect  userSelectedDate={userSelectedDate} setUserSelectedDate={setUserSelectedDate} goToNextComponent={()=>{}} />, autoNext: false, hideControls: true },
    { component: <LocationHighlight  userDate={userSelectedDate}  goToNextComponent={()=>{}} />, autoNext: false, hideControls: true },
    
    ];

  return (
    <div className="h-screen h-dvh flex items-center justify-center bg-gray-200">
      <AnimatedSequence components={components} />
    </div>
  );
};

export default StoryBoard;
