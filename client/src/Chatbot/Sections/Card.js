import React from "react";
import { Card, Icon } from "antd";
import Meta from "antd/lib/card/Meta";
function CardComponent(props) {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          src={props.cardInfo.fields.image.stringValue}
          description={props.cardInfo.fields.description.stringValue}
        />
      }
      actions={[
        <a
          target="_blank"
          rel="nooper noreferrer"
          href={props.cardInfo.fields.link.stringValue}
        >
          <Icon type="ellipsis" key="ellipsis" />
        </a>,
      ]}
    >
      <Meta
        title={props.cardInfo.fields.stack.stringValue}
        link={props.cardInfo.fields.description.stringValue}
      />
    </Card>
  );
}

export default CardComponent;
