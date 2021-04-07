import React from "react";
import { Avatar } from "antd";

const AvatarComponent = ({ username }) => {
  return (
    <Avatar
      size="large"
      src={`${`https://avatars.dicebear.com/api/human/:${username}.svg`}`}
    />
  );
};

export default AvatarComponent;
