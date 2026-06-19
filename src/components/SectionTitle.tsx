type SectionTitleProps = {
  children: React.ReactNode;
};

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <div className="mb-6">
      <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-yellow-400" />

      <h2 className="text-4xl font-bold text-yellow-400 text-center w-full py-4">
        {children}
      </h2>

      <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-yellow-400" />
    </div>
  );
};

export default SectionTitle;
