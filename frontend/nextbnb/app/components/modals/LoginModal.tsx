"use client";

import Modal from "./Modal";
import { useState } from "react";
import useLoginModal from "../hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";
import { useRouter } from "next/navigation";
import apiService from "@/app/service/apiService";
import { handleLogin } from "@/app/lib/actions";
import { errorToJSON } from "next/dist/server/render";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };
    const response = await apiService.post(
      "/api/auth/login/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      
      loginModal.close();
      router.refresh();
      router.push("/");

    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setError(tmpErrors);
    }
  };

  const content = (
    <div className=" space-y-4">
      <form action={submitLogin} className="space-y-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-gray-100 w-full  h-[54px] p-3"
          placeholder="Text your email"
          type="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Text your password"
          type="password"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={index}
              className=" border p-4 rounded-xl text-white bg-airbnb-dark opacity-40"
            >
              <p> {error}</p>
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={submitLogin} />
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
