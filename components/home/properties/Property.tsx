"use client";
import { useState, useEffect, FC, useCallback } from "react";
import { createPortal } from "react-dom";
import { PropertiesDetails } from "@/models/basic";
import ImageWindow from "../SingleListing/ImageWindow";
import HeadEl from "../SingleListing/HeadEl/HeadEl";
import GridImages from "../SingleListing/GridImages/GridImages";
import GridImagesAdaptive from "../SingleListing/GridImages/GridImagesAdaptive";
import HeadElAdaptive from "../SingleListing/HeadEl/HeadElAdaptive";
import StatsPropertyAdaptive from "../SingleListing/StatsProperty/StatsPropertyAdaptive";
import Video from "../SingleListing/Video/Video";
import ChartSection from "../SingleListing/ChartSection/ChartSection";
import Contact from "../SingleListing/Contacts/Contact";
import DevOverview from "../SingleListing/DevelopmentOverview/DevOverview";
import BottomDescription from "@/components/home/properties/BottomDescription";
import Stats from "@/components/home/properties/Stats";
import AboutProperty from "@/components/home/properties/AboutProperty";
import Map from "@/components/home/properties/Map";
import Features from "@/components/home/properties/Features";

type PropertyProps = {
    propertyDetails: PropertiesDetails;
};

const Property: FC<PropertyProps> = ({ propertyDetails }) => {
    const [isGaleryVisible, setIsGaleryVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [portalContainer, setPortalContainer] = useState<HTMLElement>();
    const [lastScrollY, setLastScrollY] = useState(0);

    console.log(propertyDetails)

    useEffect(() => {
        document.body.style.overflow = isGaleryVisible ? "hidden" : "scroll";
    }, [isGaleryVisible]);

    const controlNavbar = useCallback(() => {
        if (window.scrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [controlNavbar]);

    if (!propertyDetails) {
        return null;
    }

    return (
        <div className="bg-grays-0">
            {isGaleryVisible ? (
                <ImageWindow
                    images={propertyDetails.images || []}
                    setVisible={setIsGaleryVisible}
                />
            ) : null}

            <HeadEl propertyDetails={propertyDetails} />

            {/* images */}
            <GridImages
                images={propertyDetails.images || []}
                setIsGaleryVisible={setIsGaleryVisible}
            />
            <GridImagesAdaptive
                images={propertyDetails.images || []}
                setIsGaleryVisible={setIsGaleryVisible}
            />

            <HeadElAdaptive propertyDetails={propertyDetails} />
            <StatsPropertyAdaptive propertyDetails={propertyDetails} />
            <BottomDescription propertyDetails={propertyDetails} />
            <Stats propertyDetails={propertyDetails} />
            <AboutProperty propertyDetails={propertyDetails} />
            <Map propertyDetails={propertyDetails} />
            <Features propertyDetails={propertyDetails} />

            {/* dev overview */}
            <DevOverview images={propertyDetails.images || []} />

            <hr className="border-t border-grays-100" />

            {propertyDetails.listing.youtubeLink ? (
                <Video propertyDetails={propertyDetails} />
            ) : null}

            <hr className="border-t border-grays-100" />

            <ChartSection propertyDetails={propertyDetails} />

            <>
                {portalContainer &&
                    isVisible &&
                    createPortal(
                        <Contact isVisible={isVisible} setIsVisible={setIsVisible} />,
                        portalContainer,
                    )}
            </>
        </div>
    );
};
export default Property;
