const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-purple-500"></div>
      <span className="text-white ml-4">Loading...</span>
    </div>
  );
};

export default Loading;
