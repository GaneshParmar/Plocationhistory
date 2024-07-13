import { useEffect, useState } from "react";

function ButtonBg({ children, onClick }: { children: any, onClick: any }) {
  return (
    <button className="bg-white-400 shadow-lg drop-shadow-lg border mt-2 p-5 w-20 h-20 rounded-full " onClick={onClick}>
      {children}
    </button>
  );
}

function MapControls({ handleMapPlay , mapControl}: { handleMapPlay: (state: boolean) => {} , mapControl : (action : 'back' | 'forward')=>{} }) {
  const [mapPlaying, setMapPlaying] = useState(false);

  const handleButtonClick = () => {
    setMapPlaying(!mapPlaying);
  };

  useEffect(() => {

    handleMapPlay(mapPlaying);

  }, [mapPlaying])


  return (
    <div style={{ height: "10%", maxHeight: "10dvh" }}>
      <div className="grid grid-cols-12 w-100 text-center text-xl font-extrabold">
        <div className="flex col-span-full place-content-center gap-3 md:col-start-6 md:col-span-3">
          <div className="">
            {/* <button className="bg-white-400 p-5 w-20 h-20 rounded-full ">
              &lt;
            </button> */}
            <ButtonBg onClick={()=>{mapControl("back")}}>
              &lt;
            </ButtonBg>
          </div>
          <ButtonBg onClick={handleButtonClick}>
            {mapPlaying ?
              (<i className="fas fa-pause"></i>) :
              (<i className="fas fa-play"></i>)
            }
          </ButtonBg>
          <div>
            <ButtonBg onClick={()=>{mapControl("forward")}}>
              &gt;
            </ButtonBg>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MapControls;
