import { FC } from "react";
import { ContainerProps } from "./types";

const Container: FC<ContainerProps> = ({ restClasses, children, paddingX }) => {
  return (
    <section className={`${restClasses ? restClasses : ""} w-full`}>
      <div className="max-w-[1440px] w-full m-auto px-5 lg:px-20">
        {children}
      </div>
    </section>
  );
};

export default Container;
