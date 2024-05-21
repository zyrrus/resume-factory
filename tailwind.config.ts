import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      // [color flatten](https://www.google.com/search?q=26+to+hex&sca_esv=8452c9a9fba5013a&sca_upv=1&sxsrf=ADLYWIJuSiXAdnpbKZ1a72_C5k_XLKTCSQ%3A1716259126308&ei=NglMZvysEsehptQP9KSIiAk&ved=0ahUKEwj8n8O8252GAxXHkIkEHXQSApEQ4dUDCA8&uact=5&oq=26+to+hex&gs_lp=Egxnd3Mtd2l6LXNlcnAaAhgCIgkyNiB0byBoZXgyCxAAGIAEGJECGIoFMgUQABiABDIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB5IqgxQAFjTC3AAeACQAQGYAYYBoAGFB6oBAzEuN7gBA8gBAPgBAZgCB6AClAbCAgQQIxgnwgIKECMYgAQYJxiKBcICCxAuGIAEGLEDGIMBwgIFEC4YgATCAggQABiABBixA8ICCxAAGIAEGLEDGIMBwgILEAAYgAQYsQMYigXCAgoQLhiABBhDGIoFwgIQEAAYgAQYsQMYQxiDARiKBcICChAAGIAEGEMYigXCAhQQuQEYgAQYQxiKBRiLAxjuBBjvBMICCBAAGBYYHhgPmAMAkgcDMS42oAfeNQ&sclient=gws-wiz-serp)
      // [lab palette](https://huetone.ardov.me/)
      // [lab palette builder](https://oklch-palette.vercel.app/#59.32,0.188,20.46,100)
      white: "#fff",
      black: "#000",
      neutral: {
        50: "#fbf9fa",
        100: "#f4ecef",
        200: "#ecdfe3",
        300: "#daced2",
        400: "#c5b9bf",
        500: "#afa2a6",
        600: "#988b90",
        700: "#786c70",
        800: "#5b4d52", // Default
        900: "#392c31",
        950: "#180d11",
      },
      primary: {
        100: "#fdbcd0",
        200: "#d799ad",
        300: "#b3788b",
        400: "#90586a",
        500: "#70384c", // Default
        600: "#6c2441",
        700: "#610032",
        800: "#490024",
        900: "#340018",
      },
      // secondary: { Rename 'secondary button' to 'neutral button' so secondary could be blue in the future }
      destructive: {
        50: "#fff1f1",
        100: "#ffcfcd",
        200: "#ffa9a8",
        300: "#ff7f82",
        400: "#f15b63",
        500: "#d73f4c", // Default
        600: "#c30030",
        700: "#900021",
        800: "#5e0012",
        900: "#360006",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
