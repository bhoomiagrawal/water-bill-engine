interface WaterLoaderProps {
    text?: string; // Optional text
    size?: number; // Optional size
  }
  
  const WaterLoader: React.FC<WaterLoaderProps> = ({ text = 'Loading...', size = 20 }) => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50  z-99999">
        <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-t from-blue-400 to-blue-600 animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
            {text}
          </div>
        </div>
      </div>
    );
  };

  export default WaterLoader;
  