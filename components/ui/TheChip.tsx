type TheChipProps = {
  children: React.ReactNode;
  type: "draft" | "live" | "hidden" | "expired" | "sold" | "rating" | "dark";
};

const TheChip: React.FC<TheChipProps> = ({ children, type }) => {
  const types = {
    draft: "bg-grays-50 text-grays-600 border border-grays-50",
    live: "bg-grays-1000 text-grays-0 border border-grays-1000",
    hidden: "bg-grays-300 text-grays-0 border border-grays-300",
    expired: "bg-func-red text-grays-0 border border-func-red",
    sold: "bg-func-green text-grays-0 border border-func-green",
    rating: "bg-grays-0 text-grays-1000 border border-grays-0",
    dark: "bg-grays-600 text-grays-0 border border-grays-600",
  };
  return (
    <div
      className={`rounded-[100px] w-fit px-3 py-1 flex gap-0.5 items-center ${types[type]}`}
    >
      {children}
    </div>
  );
};

export default TheChip;
