import React, { FC, Fragment } from "react";
import Icon from "../ui/Icon";
import { calcProgress } from "@/utils/calculations";
import { Construction, ImageRes, Listing, Properties } from "@/models/basic";

export type Details = {
  listing?: Listing;
  property?: Properties;
  construction?: Construction[];
  images?: ImageRes[];
};

type ConstructionBarProps = {
  details: Details;
};

const ConstructionBar: FC<ConstructionBarProps> = ({ details }) => {
  return (
    <>
      {details?.construction &&
        details?.construction.some(
          (el) => el.status === "UNFINISHED_CONSTRUCTION"
        ) && (
          <div
            className={`construction_hover absolute bottom-0 w-full bg-beiges-400 flex gap-2.5 items-center`}
          >
            {details.construction.map((el) => {
              if (el.status === "UNFINISHED_CONSTRUCTION") {
                const progress = calcProgress(el);

                return (
                  <React.Fragment key={el.id}>
                    <div className="construction_hover_content z-[3] flex items-center gap-2.5 relative pl-4">
                      <Icon
                        iconName="hammer"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                      />
                      <p className="py-1 body_xs !font-hk_medium">
                        Construction progress {progress.toFixed(2)}%
                      </p>
                    </div>
                    <div
                      className="absolute bg-beiges-700 top-0 left-0 h-full z-[1]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </div>
        )}
    </>
  );
};

export default ConstructionBar;
