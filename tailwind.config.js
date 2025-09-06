/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {
        colors: {
          // Atlassian brand colors
          // Semantic aliases
          primary: {
            DEFAULT: "#1D7AFC", // Atlassian blue 500
            light: "#388BFF",   // Hover / lighter
            dark: "#0C66E4",    // Active / darker
          },
          secondary: {
            DEFAULT: "#44546F", // Atlassian neutral 800
            light: "#626F86",
            dark: "#2C3E5D",
          },
          success: {
            DEFAULT: "#36B37E",
            light: "#4BCE97",
            dark: "#1F845A",
          },
          warning: {
            DEFAULT: "#E2B203",
            light: "#F5CD47",
            dark: "#CF9F02",
          },
          danger: {
            DEFAULT: "#EF5C48",
            light: "#F87168",
            dark: "#CA3521",
          },
          info: {
            DEFAULT: "#388BFF",
            light: "#85B8FF",
            dark: "#0C66E4",
          },
        },

        fontFamily: {
          sans: ["System"], // iOS & Android system font
        },
        spacing: {
          "px": "1px",
          "0.5": "2px",
          "1": "4px",
          "1.5": "6px",
          "2": "8px",
          "2.5": "10px",
          "3": "12px",
          "3.5": "14px",
          "4": "16px", // Atlassian base unit
          "5": "20px",
          "6": "24px",
          "8": "32px",
          "10": "40px",
          "12": "48px",
          "16": "64px",
        },
        borderRadius: {
          none: "0",
          sm: "2px",
          DEFAULT: "4px", // Atlassian standard
          md: "8px",
          lg: "12px",
          xl: "16px",
          full: "9999px",
        },
      },
  },
  plugins: [],
}