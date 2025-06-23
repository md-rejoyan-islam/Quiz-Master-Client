const SectionTitle = ({
  firstLine,
  secondLine,
}: {
  firstLine: string;
  secondLine?: string;
}) => {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
      {firstLine}
      {secondLine && (
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {secondLine}
        </span>
      )}
    </h2>
  );
};

export default SectionTitle;
