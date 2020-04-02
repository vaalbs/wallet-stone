import React from "react";
import { ThemeProvider } from "styled-components";

interface IProps {
  children: React.ReactNode;
}

const theme = {
  color: {
    primary: "#001e32",
    secondary: "#27e6e7",
    gray: "#99a1a8",
    grayLight: "#eaf0f5",
    grayLight02: "#bec4c9",
    white: "#fff",
    darkBlue: "#020616",
    purple: "#7c61ce",
    purpleDark: "#431fa8"
  }
};

export const Theme = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
