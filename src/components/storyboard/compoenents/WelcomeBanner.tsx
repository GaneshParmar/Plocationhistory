// WelcomeComponent.jsx

import { getFormatedDate } from "../../mapcontrols/MyMap";

const WelcomeComponent = ({userSelectedDate='',title="Welcome!", description="This is a demo of text animation and image slideshow.",  goToNextComponent }) =>{
  return (
    <div>
            <div className='text-center'>
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <p className="text-lg text-gray-600 my-10">
                {description}
              </p>
              <span>
                {getFormatedDate(userSelectedDate)}
              </span>
            </div>
    </div>
  );
}

export default WelcomeComponent;
