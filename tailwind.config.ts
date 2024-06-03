import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

interface TailwindHelperFunctions {
  addUtilities: (utilities: any, variants: string[]) => void;
  theme: (key: string) => any;
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        "4.5": "1.125rem",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        scroll: "scroll 60s linear infinite",
        "scroll-fast": "scroll 20s linear infinite",
        "scroll-reverse": "scroll 60s reverse linear infinite",
      },
      width: {
        "screen-40": "calc(100vw - 40px)",
      },
      fontFamily: {
        hk_bold: ["HKGrotesk-Bold", "sans-serif"],
        hk_light: ["HKGrotesk-Light", "sans-serif"],
        hk_medium: ["HKGrotesk-Medium", "sans-serif"],
        hk_regular: ["HKGrotesk-Regular", "sans-serif"],
        tahoma_regular: ["Tahoma", "sans-serif"],
        proxima_nova_bold: ["proximanova_boldit", "sans-serif"],
        caveat: ["Caveat", "sans-serif"],
      },
      fontSize: {
        body_xs: "0.875rem",
        body_s: "1rem",
        body_m: "1.125rem",
        body_l: "1.25rem",
        h1: "3.75rem",
        h2: "2.75rem",
        h3: "2rem",
      },
      lineHeight: {
        body_xs: "21px",
        body: "24px",
        body_m: "30px",
        h1: "72px",
        h2: "52.8px",
        h3: "38.4px",
        btn_font: "27px",
      },
    },
    boxShadow: {
      status: "0px 4px 26px 0px rgba(233, 172, 84, 0.18)",
      menu: "0px 4px 26px 0px rgba(66, 71, 76, 0.078)",
      flag: "0px 0px 8px 0px #0000001F",
      "user-menu": "0px 4px 26px 0px #42474C14",
      marker: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
    },
    colors: {
      dark_blue: "#18293F",
      beiges: {
        400: "#FEFBF5",
        500: "#FEFAF2",
        600: "#FEF9EF",
        700: "#CBC7BF",
        900: "#E9AC54",
      },
      func: {
        green: "#0FA658",
        red: "#FA5951",
      },
      map: {
        blue: "#469FF2",
      },
      grays: {
        0: "#FFFFFF",
        25: "#F5F5F4",
        50: "#F1F0EE",
        100: "#D4D2CD",
        200: "#CFCDC7",
        300: "#BBBAB7",
        400: "#AFAEAA",
        500: "#8B8B89",
        600: "#6D6D6B",
        700: "#5A5C5B",
        800: "#4B4D4C",
        900: "#3C3E3D",
        1000: "#000000",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_xs": {
          fontFamily: theme("fontFamily.hk_regular"),
          fontSize: theme("fontSize.body_xs"),
          lineHeight: theme("lineHeight.body_xs"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_s": {
          fontFamily: theme("fontFamily.hk_regular"),
          fontSize: theme("fontSize.body_s"),
          lineHeight: theme("lineHeight.body"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_sb": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.body_s"),
          lineHeight: theme("lineHeight.body"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_sm": {
          fontFamily: theme("fontFamily.hk_medium"),
          fontSize: theme("fontSize.body_s"),
          lineHeight: theme("lineHeight.body"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_m": {
          fontFamily: theme("fontFamily.hk_regular"),
          fontSize: theme("fontSize.body_m"),
          lineHeight: theme("lineHeight.body_m"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_mb": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.body_m"),
          lineHeight: theme("lineHeight.body_m"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".body_l": {
          fontFamily: theme("fontFamily.hk_medium"),
          fontSize: theme("fontSize.body_l"),
          lineHeight: theme("lineHeight.body"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h1": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.h1"),
          lineHeight: theme("lineHeight.h1"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h2": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.h2"),
          lineHeight: theme("lineHeight.h2"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h3": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.h3"),
          lineHeight: theme("lineHeight.h3"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h4": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.body_l"),
          lineHeight: theme("lineHeight.body_m"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h5": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.body_s"),
          lineHeight: theme("lineHeight.body"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".heading_h6": {
          fontFamily: theme("fontFamily.hk_medium"),
          fontSize: theme("fontSize.body_xs"),
          lineHeight: theme("lineHeight.body_xs"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
    plugin(function ({ addUtilities, theme }: TailwindHelperFunctions) {
      const newUtilities = {
        ".btn_font": {
          fontFamily: theme("fontFamily.hk_bold"),
          fontSize: theme("fontSize.body_m"),
          lineHeight: theme("lineHeight.btn_font"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
export default config;
