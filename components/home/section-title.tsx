const SectionTitle = ({
  firstLine,
  secondLine,
}: {
  firstLine: string;
  secondLine?: string;
}) => {
  return (
    <h2 className="text-3xl text-center sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
      {firstLine}
      {secondLine && (
        <span className="block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {secondLine}
        </span>
      )}
    </h2>
  );
};

export default SectionTitle;
