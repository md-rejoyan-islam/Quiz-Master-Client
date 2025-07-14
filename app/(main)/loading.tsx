const Loading = () => {
  return (
    <div className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-8">
      {/* Main Loading Visualization */}
      <div className="relative mb-12">
        {/* Central Hub */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border border-cyan-500 rounded-full"></div>

          {/* Rotating Elements */}
          <div className="absolute inset-4 border-t-4 border-sky-500 rounded-full animate-spin opacity-80"></div>
          <div className="absolute inset-8 border-r-4 border-teal-500 rounded-full animate-[spin_linear_4s_infinite] opacity-60"></div>

          {/* Center Core */}
          <div className="relative w-16 h-16 bg-teal-500/10 rounded-full border border-teal-200/30 shadow-soft flex items-center justify-center">
            <div className="w-6 h-6 bg-teal-400 rounded-full shadow-glow animate-[pulse_linear_2s_infinite]"></div>
          </div>

          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-30"></div>
        </div>

        {/* Data Points */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-yellow-700 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <div
            className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
          <div
            className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
        <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
          <div
            className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
