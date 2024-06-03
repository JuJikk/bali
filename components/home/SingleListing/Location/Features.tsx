import { text } from "@/const/text";

type FeaturesProps = {
  features: string[] | string;
};

function Features({ features }: FeaturesProps) {
  return (
    <div className="w-full flex flex-col gap-y-11 pb-11">
      <h3 className="font-bold text-h3 leading-h3">
        {text.singleLising.featuresSection.title.en}
      </h3>
      <div className="flex gap-x-11">
        {typeof features !== "string" ? (
          features.map((feature, i) => (
            <div key={i} className="text-body_m text-grays-700 leading-body_m">
              {feature}
            </div>
          ))
        ) : (
          <div className="text-body_m text-grays-700 leading-body_m">
            {features}
          </div>
        )}
      </div>
    </div>
  );
}

export default Features;
