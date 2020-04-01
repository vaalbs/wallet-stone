import React from "react";
import { BellIcon, HeaderWrapper, User } from "./styled";

const user = require("../../assets/images/user.jpg");

export const Header = () => {
  return (
    <HeaderWrapper>
      <BellIcon />
      <User src={user} />
    </HeaderWrapper>
  );
};
