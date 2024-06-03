import Link from "next/link";
import MasonrySection from "../home/MasonrySection";
import Icon from "../ui/Icon";

type Items = {
  id: number;
  title: string;
  href: string;
};

const quickLinksItems: Items[] = [
  { id: 1, title: "Blog", href: "/blog" },
  { id: 2, title: "Contact", href: "/contact" },
  { id: 3, title: "FAQ", href: "/faq" },
];

const legalItems: Items[] = [
  {
    id: 1,
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    id: 2,
    title: "Terms of Use",
    href: "/terms-of-use",
  },
  {
    id: 3,
    title: "Cookie Policy",
    href: "/cookie-policy",
  },
];

const Footer = async () => {
  return (
    <footer className="relative lg:static">
      <MasonrySection />
      <div className="w-full bg-beiges-600 flex items-center mx-auto flex-col py-11 lg:py-20">
        <div className="max-w-[1440px] w-full m-auto px-5 lg:px-20">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <div className="flex justify-center">
              <div className="flex flex-col gap-6">
                <div className="flex justify-center lg:justify-start">
                  <Icon
                    iconName="logo"
                    width="100"
                    height="24"
                    viewBox="0 0 100 24"
                  />
                </div>
                <h3 className="pb-11 sm:body_s leading-[24px] text-grays-900 max-w-[500px] lg:max-w-[394px] text-center lg:text-left">
                  BaliProfit is a comprehensive online platform dedicated to
                  connecting buyers, sellers, and renters with a wide range of
                  property listings in Bali.
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-6">
              <h2 className="text-center heading_h4 text-grays-900">
                Quick Links
              </h2>
              <div className="flex flex-col items-center lg:items-start gap-3 pb-11">
                {quickLinksItems.map((item) => (
                  <Link href={"/"} key={item.id}>
                    {/* <Link href={item.href} key={item.id}> */}
                    <h2 className="body_s text-grays-1000">{item.title}</h2>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-6 pb-11">
              <h2 className="heading_h4 text-grays-900">Legal</h2>
              <div className="flex flex-col items-center gap-3">
                {legalItems.map((item) => (
                  <Link href={"/"} key={item.id}>
                    {/* <Link href={item.href} key={item.id}> */}
                    <h2 className="body_s text-grays-1000">{item.title}</h2>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="body_s text-grays-900 max-w-[500px] lg:max-w-[205px] text-center lg:text-start">
                Copyright © 2024 BaliProfit. All Rights Reserved.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
