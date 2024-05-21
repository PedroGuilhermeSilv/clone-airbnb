"use client";

import CustomButton from "../forms/CustomButton";
const ConversationDetail = () => {
  return (
    <>
      <div className=" h-max[400px] flex flex-col overflow-auto space-y-4">
        <div className=" w-[80%] bg-gray-200 rounded-xl px-6 py-4">
          <p className="font-bold text-gray-600"> Jhon Doe</p>
          <p> asldkjfnalksdjfhnasdlkfjasdf</p>
        </div>
        <div className=" w-[80%] ml-[20%] bg-blue-200 rounded-xl px-6 py-4">
          <p className="font-bold text-gray-600"> Pedro Guilherme</p>
          <p> asldkjfnalksdjfhnasdlkfjasdf</p>
        </div>
      </div>
      <div className=" mt-4 py-4 px-6 flex border border-gray-300 rounded-xl p-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="bg-gray-200 w-full p-2 mr-2 rounded-xl"
        />
        <CustomButton className="w-[100px]" label="send" onClick={() => console.log("send")} />
      </div>
    </>
  );
};

export default ConversationDetail;
