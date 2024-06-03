import Image from "next/image";

type RegionCardProps = {
  name: string;
  imgPath: string;
};

const RegionCard: React.FC<RegionCardProps> = ({ name, imgPath }) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      <div className="h-full bg-grays-25 flex justify-center items-center rounded-2xl py-2 hover:bg-grays-50">
        <Image src={imgPath} alt="region" width={80} height={50} />
      </div>
      <p className="bode_s">{name}</p>
    </div>
  );
};

export default RegionCard;
