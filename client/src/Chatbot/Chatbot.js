import Axios from "axios";
import React, { useEffect } from "react";

function Chatbot() {
  useEffect(() => {
    eventQuery("WelcomeToMyWebsite");
  }, []);
  const textQuery = async (text) => {
    let conversations = [];
    // First Need to take care of the  message I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    conversations.push(conversation);

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
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: "bot",
        content: content,
      };

      console.log(conversation);
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "오류가 일어난 것 같아요. 죄송해요.",
          },
        },
      };
    }
    conversations.push(conversation);
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
      const content = response.data.fulfillmentMessages[0];

      let conversation = {
        who: "bot",
        content: content,
      };

      console.log(conversation);
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "오류가 일어난 것 같아요. 죄송해요.",
          },
        },
      };

      console.log(conversation);
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
        Chatbot
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
