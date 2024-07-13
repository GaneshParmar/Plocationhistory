import { motion, useCycle } from 'framer-motion';


const images = [
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
];

const ImageSlideshow = ({ images, goToNextComponent }) => {
  const [index, cycleImages] = useCycle(...images);
  const [isPlaying, setIsPlaying] = useState(true);

  // Function to toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Automatically cycle through images if isPlaying is true
  if (isPlaying) {
    setTimeout(() => {
      cycleImages();
    }, 2000); // Change delay as needed
  }

  return (
    <motion.div
      className="relative h-screen w-100 bg-red-400"
      initial={{ opacity: 1}}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      
        <motion.img
          key={index}
          src={index}
          alt="Slideshow"
          className=" inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.button
            className="text-white text-2xl p-3 bg-gray-800 bg-opacity-50 rounded-full"
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
          </motion.button>
        </motion.div>
    </motion.div>
  );
};