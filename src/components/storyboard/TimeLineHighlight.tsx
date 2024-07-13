import { highlightType } from "../mainpage/SelectHighlight";
import AnimatedSequence from "./compoenents/AnimationSequence";
import ImageGalleryView from "./compoenents/ImageGalleryView";
import WelcomeComponent from "./compoenents/WelcomeBanner";

function TimeLineHighlight({selectedHighlight, userSelectedDate, goToNextComponent=()=>{}}:{selectedHighlight : highlightType,userSelectedDate:string,goToNextComponent:()=>void}) {
  

    const components = [
      { component: <WelcomeComponent userSelectedDate={userSelectedDate} title={selectedHighlight?.[0].name} description={selectedHighlight?.[0].description} />, autoNext: true, hideControls: false, duration : 10000 , show_animation_control_delay : 0.5},
      {component: <ImageGalleryView images={selectedHighlight?.[0].images} goToLocationView={goToNextComponent}/>, autoNext: true, hideControls: true, duration : 30000  },
    ];
  
    return (
      <div className="h-screen flex items-center justify-center bg-gray-200">
        <AnimatedSequence components={components} />
      </div>
    );
}

export default TimeLineHighlight