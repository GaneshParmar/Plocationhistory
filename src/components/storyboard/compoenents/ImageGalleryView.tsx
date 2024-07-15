
// import { useEffect, useState } from 'react';

// import ImageGallery from "react-image-gallery";
// // import stylesheet if you're not already using CSS @import
// import "react-image-gallery/styles/css/image-gallery.css";


// // const slideImages = [
// //   {
// //     url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
// //     caption: 'Slide 1'
// //   },
// //   {
// //     url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
// //     caption: 'Slide 2'
// //   },
// //   {
// //     url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
// //     caption: 'Slide 3'
// //   },
// // ];

// const Slideshow = ({images,goToNextComponent}:{images : object[] | string[] | any[], goToNextComponent : ()=>void}) => {


//     let images_ = images;
//     // transform this images prop into down images_
    
//     // so basically images can be object array of [{url: string, caption : string}] or string[]
//     // if it has caption
//     // then images {original , thumbnail , caption}

//     // const images_ = [
//     //     {
//     //       original: "https://picsum.photos/id/1018/1000/600/",
//     //       thumbnail: "https://picsum.photos/id/1018/250/150/",
//     //     },
//     //     {
//     //       original: "https://picsum.photos/id/1015/1000/600/",
//     //       thumbnail: "https://picsum.photos/id/1015/250/150/",
//     //     },
//     //     {
//     //       original: "https://picsum.photos/id/1019/1000/600/",
//     //       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     //     },
//     //   ];
//     const [sliderImages, setSliderImgaes] = useState(images_);

      
//     useEffect(()=>{

//         if(sliderImages?.length == 0){
//             goToNextComponent();
//         }

//     },[images]);

//     return (
//       <div className="slide-container bg-red-400 w-screen h-screen">
//         {/* <Slide>
//          {sliderImages.map((slideImage, index)=> (
//             <div key={index}>
//               <div style={{ ...divStyle, 'backgroundImage': `url(${typeof slideImage == 'object'?slideImage:slideImage})` }}>
//                 <span style={spanStyle}>{slideImage.caption}</span>
//               </div>
//             </div>
//           ))} 
//         </Slide> */}
//          <ImageGallery items={sliderImages} />
//       </div>
//     )
// }

// export default Slideshow;

import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { RoundedButton } from '../../utils/common/RoundedButton';
const baseUrl = import.meta.env.BASE_URL;

const AnimationControl = ({ goToPreviousComponent, goToNextComponent } : any) => {
    return (
      <div className='fixed bottom-0 w-100 flex justify-center mx-auto gap-10 text-center left-1/2 -translate-x-1/2'>
        <RoundedButton onClick={goToPreviousComponent} className="rounded-3xl">
          Back
        </RoundedButton>
        <RoundedButton onClick={goToNextComponent} className="rounded-3xl">
          Show Location
        </RoundedButton>
      </div>
    );
  };

const Slideshow = ({ images, goToPreviousComponent, goToLocationView }) => {


  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
   
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 5000);

      return () => {clearTimeout(timer);setShowControls(false)};
   
  }, []);


  const transformImages = (images) => {
    return images.map((image) => {
      if (typeof image === 'string') {
        return {
          original: baseUrl + image
        };
      } else if (typeof image === 'object' && image.url) {
        return {
          original: baseUrl+image.url,
          thumbnail: baseUrl+image.url,
          description: image.caption || '',
        };
      }
      return null;
    }).filter(Boolean); // Filter out any null values
  };

  const [sliderImages, setSliderImages] = useState(transformImages(images));

  useEffect(() => {
    setSliderImages(transformImages(images));
  }, [images]);

  useEffect(() => {
    if (sliderImages.length === 0) {
        goToLocationView();
    }
  }, [sliderImages]);

  return (
    <div className="slide-container text-red-500 w-screen h-screen">
      <ImageGallery autoPlay={false} infinite={false} items={sliderImages} />
      {showControls && <AnimationControl goToPreviousComponent={goToPreviousComponent} goToNextComponent={goToLocationView}/>}
    </div>
  );
};

export default Slideshow;
