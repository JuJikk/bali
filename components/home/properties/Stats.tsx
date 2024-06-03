import {FC} from "react";
import {PropertiesDetails} from "@/models/basic";
type PropertyProps = {
    propertyDetails: PropertiesDetails;
};

const Stats: FC<PropertyProps> = ({propertyDetails}) => {
    return (
        <div className="hidden lg:flex w-full bg-grays-25 box-border justify-evenly py-6">
            <div className="min-w-[88.88%] justify-around md:py-[44px] py-0 px-10 md:px-20 box-border md:flex">
                <div className="md:flex-col flex gap-x-5">
                    <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
                        {propertyDetails?.properties[0]?.landSize}
                    </h3>
                    <div className="text-body_s font-normal text-grays-700">
                        Are plot
                    </div>
                </div>
                <div className="md:flex-col flex gap-x-5">
                    <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
                        {propertyDetails?.properties[0]?.bedrooms}
                    </h3>
                    <div className="text-body_s font-normal text-grays-700">
                        Bedrooms
                    </div>
                </div>
                <div className="md:flex-col flex gap-x-5">
                    <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
                        {propertyDetails?.properties[0]?.bathrooms} m&sup2;
                    </h3>
                    <div className="text-body_s font-normal text-grays-700">
                        Bathrooms
                    </div>
                </div>
                <div className="md:flex-col flex gap-x-5">
                    <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
                        {propertyDetails?.properties[0]?.buildArea}
                    </h3>
                    <div className="text-body_s font-normal text-grays-700">
                        Building size
                    </div>
                </div>
                <div className="md:flex-col flex gap-x-5">
                    <h3 className="font-bold text-grays-1000 text-h3 leading-h3">
                        {propertyDetails?.properties[0]?.poolSize} m&sup2;
                    </h3>
                    <div className="text-body_s font-normal text-grays-700">
                        Private Pool
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats