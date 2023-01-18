import { ColorModesScale, Theme, ThemeUIStyleObject } from "theme-ui";

export interface LabelVarients {
  visuallyHidden: ThemeUIStyleObject;
}

export interface InputVariants {
  minimal: ThemeUIStyleObject
}

export interface DefaultFlex {
  display: "flex";
}

export interface FlexColumn extends DefaultFlex {
  flexDirection: "column";
  alignItems: "center";
}

export interface FlexRow extends DefaultFlex {
  flexDirection: "row";
  alignItems: "center";
}

export interface FlexVariant {
  default: DefaultFlex;
  column: FlexColumn;
  row: FlexRow;
}

export interface PizzaTheme extends Theme {
  flex: FlexVariant;
  colors: ColorModesScale;
  inputs?: InputVariants;
  labels?: LabelVarients;
}

export const theme: PizzaTheme = {
  fonts: {
    body: '"Lexend Mega", system-ui, sans-serif',
    heading: '"Rubik Mono One", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#ffffff",
    background: "#7c1526",
    primary: "#7c1526",
    secondary: "#008764",
    white: "#ffffff",
    black: "#000000",
    danger: "red"
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 76, 88],
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: [6, 7],
      color: "text",
    },
    subHeading: {
      fontFamily: "body",
      lineHeight: "body",
      fontSize: 4,
      color: "text",
    },
    body: {
      fontFamily: "body",
      lineHeight: "body",
      fontSize: 4,
      color: "black",
    }
  },
  buttons: {
    outlined: {
      bg: "transparent",
      border: "1px solid #7c1526",
      borderRadius: "2px",
      py: 1,
      px: 2,
      "&:hover": {
        cursor: "pointer"
      },
      "&:disabled": {
        cursor: "not-allowed",
        border: "1px solid lightgray",
        color: "lightgray"
      }
    },
    tabButton: {
      color: "text",
      bg: "black",
      mx: 2,
      py: 2,
      px: 2,
      border: "none",
      borderRadius: "1px",
      fontSize: 3,
      transition: "all 150ms",
      selected: {
        color: "text",
        bg: "black",
        mx: 2,
        py: 2,
        px: 2,
        border: "none",
        borderRadius: "1px",
        fontSize: 3,
        transition: "all 150ms",
        boxShadow: "boxShadow",
        transform: `translateY(-2px)`,
      },
      "&:hover": {
        cursor: "pointer",
        bg: "#1e1e1e",
      },
      "&:focus": {
        boxShadow: "boxShadow",
        border: `1px white`
      },
      "&:focus-visible": {
        border: `1px white`
      },
    },
  },
  shadows: {
    boxShadow: `2px 4px 12px #180000`,
  },
  styles: {
    hr: {
      mx: 4,
      border: "none",
      borderBottom: `1px solid #000`,
      opacity: 0.15,
      width: "100%"
    },
    spinner: {
      color: "white",
      m: 2,
    }
  },
  flex: {
    default: {
      display: "flex"
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  inputs: {
    minimal: {
      borderRadius: 0,
      py: 1,
      my: 0,
      border: "none",
      borderBottom: (theme) => `1px solid ${theme.colors?.background}`,
      "&:focus, :focus-visible": {
        border: "none",
        outline: "none",
        borderBottom: (theme) => `2px solid ${theme.colors?.background}`,
      },
    }
  },
  labels: {
    visuallyHidden: {
      /* Accessible hidden label snippet https://www.w3.org/WAI/tutorials/forms/labels/#note-on-hiding-elements */
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
    }
  }
};

