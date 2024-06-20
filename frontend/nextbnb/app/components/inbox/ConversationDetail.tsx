"use client";

import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";
import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,
}) => {
  console.log(conversation);
  const myUser = conversation.users.find((user) => user.id == userId);
  const otherUser = conversation.users.find((user) => user.id !== userId);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    `ws://localhost:8000/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("Connection state changed", readyState);
  }, [readyState]);
  return (
    <>
      <div className=" h-max[400px] flex flex-col overflow-auto space-y-4">
        <div className=" w-[80%] bg-gray-200 rounded-xl px-6 py-4">
          <p className="font-bold text-gray-600"> {otherUser?.name}</p>
          <p> asldkjfnalksdjfhnasdlkfjasdf</p>
        </div>
        <div className=" w-[80%] ml-[20%] bg-blue-200 rounded-xl px-6 py-4">
          <p className="font-bold text-gray-600"> Pedro Guilherme</p>
          <p> asldkjfnalksdjfhnasdlkfjasdf</p>
        </div>
      </div>
      <div className=" justify-between mt-4 py-4 px-6 flex border border-gray-300 rounded-xl p-2">
        <input
          type="text"
          placeholder="Type your message..."
          className=" bg-gray-200 w-full p-2 mr-2 rounded-xl"
        />
        <CustomButton
          className="w-[10%]"
          label="send"
          onClick={() => console.log("send")}
        />
      </div>
    </>
  );
};

export default ConversationDetail;
