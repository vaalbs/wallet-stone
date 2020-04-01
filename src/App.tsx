import React from "react";
import "./App.css";
import { Theme } from "./Theme";
import { Main } from "./containers/Main";
import "antd/dist/antd.css";

export const App: React.FC = () => {
  return (
    <Theme>
      <Main />
    </Theme>
  );
};

export default App;
