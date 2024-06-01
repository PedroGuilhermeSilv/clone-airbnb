"use client";
import useSingupModal from "../hooks/useSingupModal";
import CustomButton from "../forms/CustomButton";
import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "../../service/apiService";
import { handleLogin } from "@/app/lib/actions";

const SingupModal = () => {
  const router = useRouter();
  const singupModal = useSingupModal();
  const [errors, setError] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const submitSingup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await apiService.post(
      "/api/auth/register/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      singupModal.close();
      router.refresh();
      router.push("/");
    } else {
      const tmpErros: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setError(tmpErros);
    }
  };

  const content = (
    <div className=" space-y-4">
      <form action={submitSingup} className="space-y-5">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-gray-100 w-full  h-[54px] p-3"
          placeholder="Text your email"
          type="email"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Text your password"
          type="password"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Repeat your password"
          type="password"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className=" border p-4 rounded-xl text-white bg-airbnb-dark opacity-40"
            >
              <p> {error}</p>
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={submitSingup} />
      </form>
    </div>
  );
  return (
    <Modal
      label="Sing up"
      content={content}
      isOpen={singupModal.isOpen}
      close={singupModal.close}
    />
  );
};

export default SingupModal;
