/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {
        colors: {
          font: {
            DEFAULT: '#292A2E',
            dark: '#BFC1C4',
            disabled: {
              DEFAULT: '#080F214A',
              dark: '#E5E9F640',
            },
            selected: {
              DEFAULT: '#1868DB',
              dark: '#669DF1',
            },
            brand: {
              DEFAULT: '#1868DB',
              dark: '#669DF1',
            },
            danger: {
              DEFAULT: '#AE2E24',
              dark: '#FD9891',
            },
            warning: {
              DEFAULT: '#9E4C00',
              dark: '#FBC828',
            },
            discovery: {
              DEFAULT: '#803FA5',
              dark: '#D8A0F7',
            },
            information: {
              DEFAULT: '#1558BC',
              dark: '#8FB8F6',
            },
            subtlest: {
              DEFAULT: '#6B6E76',
              dark: '#96999E',
            },
            subtle: {
              DEFAULT: '#505258',
              dark: '#A9ABAF',
            },
          },
          link: {
            DEFAULT: '#1868DB',
            dark: '#669DF1',
          },
          border: {
            DEFAULT: '#0B120E24',
            dark: '#E3E4F21F',
            disabled: {
              DEFAULT: '#0515240F',
              dark: '#CECED912',
            },
            focused: {
              DEFAULT: '#4688EC',
              dark: '#8FB8F6',
            },
            input: {
              DEFAULT: '#8C8F97',
              dark: '#7E8188',
            },
            selected: {
              DEFAULT: '#1868DB',
              dark: '#669DF1',
            },
            brand: {
              DEFAULT: '#1868DB',
              dark: '#669DF1',
            },
            danger: {
              DEFAULT: '#E2483D',
              dark: '#F15B50',
            },
            warning: {
              DEFAULT: '#E06C00',
              dark: '#F68909',
            },
            success: {
              DEFAULT: '#6A9A23',
              dark: '#82B536',
            },
            discovery: {
              DEFAULT: '#AF59E1',
              dark: '#BF63F3',
            },
            information: {
              DEFAULT: '#357DE8',
              dark: '#4688EC',
            },
            bold: {
              DEFAULT: '#7D818A',
              dark: '#7E8188',
            },
          },
          background: {
            disabled: {
              DEFAULT: '#17171708',
              dark: '#BDBDBD0A',
            },
            input: {
              DEFAULT: '#FFFFFF',
              pressed: '#FFFFFF',
              dark: {
                DEFAULT: '#242528',
                pressed: '#242528',
              },
            },
            neutral: {
              DEFAULT: '#0515240F',
              pressed: '#080F214A',
              subtle: {
                DEFAULT: '#00000000',
                pressed: '#0B120E24',
                dark: {
                  DEFAULT: '#00000000',
                  pressed: '#E3E4F21F',
                },
              },
              bold: {
                DEFAULT: '#292A2E',
                pressed: '#505258',
                dark: {
                  DEFAULT: '#CECFD2',
                  pressed: '#A9ABAF',
                },
              },
              dark: {
                DEFAULT: '#CECED912',
                pressed: '#E5E9F640',
              },
            },
            selected: {
              DEFAULT: '#E9F2FE',
              pressed: '#8FB8F6',
              bold: {
                DEFAULT: '#1868DB',
                pressed: '#123263',
                dark: {
                  DEFAULT: '#669DF1',
                  pressed: '#CFE1FD',
                },
              },
              dark: {
                DEFAULT: '#1C2B42',
                pressed: '#1558BC',
              },
            },
            brand: {
              subtlest: {
                DEFAULT: '#E9F2FE',
                hovered: '#CFE1FD',
                pressed: '#8FB8F6',
                dark: {
                  DEFAULT: '#1C2B42',
                  pressed: '#1558BC',
                },
              },
              bold: {
                DEFAULT: '#1868DB',
                hovered: '#1558BC',
                pressed: '#123263',
                dark: {
                  DEFAULT: '#669DF1',
                  pressed: '#CFE1FD',
                },
              },
              boldest: {
                DEFAULT: '#1C2B42',
                hovered: '#123263',
                pressed: '#1558BC',
                dark: {
                  DEFAULT: '#E9F2FE',
                  pressed: '#8FB8F6',
                },
              },
            },
            danger: {
              DEFAULT: '#FFECEB',
              hovered: '#FFD5D2',
              pressed: '#FD9891',
              bold: {
                DEFAULT: '#C9372C',
                hovered: '#AE2E24',
                pressed: '#5D1F1A',
                dark: {
                  DEFAULT: '#F87168',
                  pressed: '#FFD5D2',
                },
              },
              dark: {
                DEFAULT: '#42221F',
                pressed: '#AE2E24',
              },
            },
            warning: {
              DEFAULT: '#FFF5DB',
              hovered: '#FCE4A6',
              pressed: '#FBC828',
              bold: {
                DEFAULT: '#FBC828',
                hovered: '#FCA700',
                pressed: '#F68909',
                dark: {
                  DEFAULT: '#FBC828',
                  pressed: '#F68909',
                },
              },
              dark: {
                DEFAULT: '#3A2C1F',
                pressed: '#9E4C00',
              },
            },
            success: {
              DEFAULT: '#EFFFD6',
              hovered: '#D3F1A7',
              pressed: '#B3DF72',
              bold: {
                DEFAULT: '#5B7F24',
                hovered: '#4C6B1F',
                pressed: '#37471F',
                dark: {
                  DEFAULT: '#94C748',
                  pressed: '#D3F1A7',
                },
              },
              dark: {
                DEFAULT: '#28311B',
                pressed: '#4C6B1F',
              },
            },
            discovery: {
              DEFAULT: '#F8EEFE',
              hovered: '#EED7FC',
              pressed: '#D8A0F7',
              bold: {
                DEFAULT: '#964AC0',
                hovered: '#803FA5',
                pressed: '#48245D',
                dark: {
                  DEFAULT: '#C97CF4',
                  pressed: '#EED7FC',
                },
              },
              dark: {
                DEFAULT: '#35243F',
                pressed: '#803FA5',
              },
            },
            information: {
              DEFAULT: '#E9F2FE',
              hovered: '#CFE1FD',
              pressed: '#8FB8F6',
              bold: {
                DEFAULT: '#1868DB',
                hovered: '#1558BC',
                pressed: '#123263',
                dark: {
                  DEFAULT: '#669DF1',
                  pressed: '#CFE1FD',
                },
              },
              dark: {
                DEFAULT: '#1C2B42',
                pressed: '#1558BC',
              },
            },
          },
          surface: {
            DEFAULT: "#FFFFFF",
            dark: '#1F1F21',
            hovered: "#F0F1F2",
            pressed: "#DDDEE1",
            overlay: {
              DEFAULT: "#FFFFFF",
              hovered: "#F0F1F2",
              pressed: "#DDDEE1",
            },
            raised: {
              DEFAULT: "#FFFFFF",
              hovered: "#F0F1F2",
              pressed: "#DDDEE1",
            },
            sunken: "#F8F8F8",
          },
          skeleton: {
            DEFAULT: "#0515240F",
            dark: '#CECED912',
            subtle: "#17171708",
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