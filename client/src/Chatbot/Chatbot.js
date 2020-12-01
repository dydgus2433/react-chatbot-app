import { Avatar, Icon, List } from "antd";
import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import Message from "./Sections/Message";
import Card from "./Sections/Card";
function Chatbot() {
  const messageFromRedux = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    eventQuery("WelcomeToMyWebsite");
  }, []);

  const textQuery = async (text) => {
    // First Need to take care of the  message I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    dispatch(saveMessage(conversation));
    //We need to take care of the message Chatbot sent
    const textQueryVariables = {
      text: text,
    };
    try {
      // I will send request to the textQuery ROUTE

      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "오류가 일어난 것 같아요. 죄송해요.",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    // First Need to take care of the  message I sent

    //We need to take care of the message Chatbot sent
    const eventQueryVariables = {
      event,
    };
    try {
      // I will send request to the textQuery ROUTE

      const response = await Axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "오류가 일어난 것 같아요. 죄송해요.",
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };
  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type something first");
      }
      //we will send request to text query route
      textQuery(e.target.value);

      e.target.value = "";
    }
  };
  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };
  const renderOneMessage = (message, i) => {
    console.log("message", message);

    //we need to give some condition here to separate message kinds
    if (message.content && message.content.text && message.content.text.text) {
      // template for normal text
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (
      message.content &&
      message.content.payload &&
      message.content.payload.fields.card
    ) {
      const AvatarSrc = <Icon type="robot" />;
      return (
        <List.Item style={{ padding: "1rem" }}>
          <List.Item.Meta
            avatar={<Avatar icon={AvatarSrc} />}
            title={message.who}
            description={renderCards(
              message.content.payload.fields.card.listValue.values
            )}
          />
        </List.Item>
      );
    }

    //template from card message
  };
  const renderMessage = (returnMessages) => {
    if (returnMessages) {
      return returnMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };
  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px",
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messageFromRedux)}
      </div>

      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem",
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHandler}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
