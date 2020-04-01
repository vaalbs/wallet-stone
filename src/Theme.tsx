import React from "react";
import { ThemeProvider } from "styled-components";

interface IProps {
  children: React.ReactNode;
}

const theme = {
  color: {
    primary: "#001e32",
    secondary: "#27e6e7",
    text: "#99a1a8",
    white: "#fff"
  }
};

export const Theme = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
