import { Avatar, Icon, List } from "antd";
import React from "react";

function Message(props) {
  const AvatarSrc =
    props.who === "bot" ? <Icon type="robot" /> : <Icon type="smile" />;
  return (
    <List.Item style={{ padding: "1rem" }}>
      <List.Item.Meta
        avatar={<Avatar icon={AvatarSrc} />}
        title={props.who}
        description={props.text}
      />
    </List.Item>
  );
}

export default Message;
