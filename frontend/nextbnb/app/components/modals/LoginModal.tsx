"use client";

import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const content = (
    <div className=" space-y-4">
      <form className="space-y-5">
        <input
          className="rounded-xl border border-gray-100 w-full  h-[54px] p-3"
          placeholder="Text your email"
          type="email"
        />
        <input
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Text your password"
          type="tetx"
        />
        <div className=" border p-4 rounded-xl text-white bg-airbnb-dark opacity-40">
            <p> The menssage error</p>
        </div>
        <CustomButton
        label="Submit"
        onClick={() => console.log("log in")} />
      </form>
    </div>
  );
  return (
    <Modal
      label="Log in"
      content={content}
      isOpen={loginModal.isOpen}
      close={loginModal.close}
    />
  );
};

export default LoginModal;
