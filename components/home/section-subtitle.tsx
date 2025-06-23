const SectionSubtitle = ({ title }: { title: string }) => {
  return (
    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
      {title}
    </p>
  );
};

export default SectionSubtitle;
