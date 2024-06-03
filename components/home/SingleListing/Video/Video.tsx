import React from "react";
import Icon from "@/components/ui/Icon";
import { PropertiesDetails } from "@/models/basic";

type VideoProps = { propertyDetails: PropertiesDetails };

function Video({ propertyDetails }: VideoProps) {
  return (
    <div className="lg:flex w-full h-full lg:max-h-[420px] py-[44px]">
      <div className="lg:w-1/2 w-full pb-8">
        <h4 className="text-h3 leading-body_m text-grays-1000 font-bold">
          Video
        </h4>
      </div>

      <div
        className="flex gap-x-11 items-center  lg:w-1/2 w-full h-[320px] rounded-lg overflow-hidden bg-grays-200"
        style={{ clipPath: "inset(0% 0% round 20px)" }}
      >
        <div className="w-full h-full rounded-2xl overflow-hidden relative bg-grays-1000">
          <iframe
            width="100%"
            height="100%"
            title="YouTube video player"
            allow="accelerometer; autoplay=false; gyroscope;"
            allowFullScreen
            // src={propertyDetails.listing.youtubeLink}
            src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Video;
