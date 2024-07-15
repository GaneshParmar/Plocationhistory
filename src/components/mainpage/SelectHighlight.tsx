import { useEffect, useState } from 'react';
import highlightData from './highlight.json';

interface HighlightProps {
  highlight: any;
  handleSelectDate: (date: Date) => void;
  isActive: boolean;
  setActiveHighlight: (name: string) => void;
}

export interface highlightType {
  name : string;
  date : string,
  description : string,
  images : string[]
}

function Highlight({ highlight, handleSelectDate, isActive, setActiveHighlight }: HighlightProps) {
  const handleClick = () => {
    setActiveHighlight(highlight.name);
    handleSelectDate(new Date(highlight.date), true);
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg p-4 cursor-pointer transition duration-300 ease-in-out transform mx-auto border-4 scale-95 ${
        isActive ? 'bg-blue-500 text-white ' : 'hover:bg-blue-500 hover:text-white hover:scale-100'
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{highlight.name}</div>
        <p className={`text-base ${isActive ? 'text-white' : 'text-gray-700'}`}>{highlight.description}</p>
      </div>
      {highlight.image && (
        <img className="w-full" src={highlight.image} alt={highlight.name} />
      )}
    </div>
  );
}

interface SelectHighlightProps {
  handleSelectDate: (date: Date) => void;
  userSelectedDate : Date;
}

function SelectHighlight({ handleSelectDate,userSelectedDate }: SelectHighlightProps) {
  const [highlights, setHighlights] = useState([]);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  useEffect(() => {
    // Load the highlights data from the JSON file
    setHighlights(highlightData.highlights);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <span className='text-center hidden md:block'>
        Highlights (Niche click kare aur dhekhe location)
      </span>
      {highlights.map((highlight, index) => (
        <>
        <Highlight
          key={'a'+index}
          highlight={highlight}
          handleSelectDate={handleSelectDate}
          isActive={new Date(highlight.date).toUTCString() == new Date(userSelectedDate).toUTCString()}
          setActiveHighlight={setActiveHighlight}
        />
        </>
      ))}
    </div>
  );
}

export default SelectHighlight;
