"use client";

import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import useLoadingModal from "../hooks/useLoadingModal";
import apiService from "@/app/service/apiService";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/lib/actions";

interface LoadingModalProps {
  code: string | string[];
}

const LoadingModal: React.FC<LoadingModalProps> = ({ code }) => {
  const loginModal = useLoadingModal();
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("Loading...");
  const router = useRouter();
  console.log(code);
  const fetchApiData = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`/api/auth/google/?code=${code}`);
      console.log(response);
      if (response.token) {
        handleLogin(response.user_id, response.token, response.refresh_token);
        loginModal.close();
        router.push("/");
        // router.refresh(); // Dependendo da versão do Next.js, router.refresh() pode não ser necessário
      } else {
        console.log("Acesso negado ou erro na resposta");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };
  const content = (
    <div className="flex justify-center">
      <ClipLoader color="#000" loading={true} size={20} />
    </div>
  );
  return (
    <Modal
      label={label}
      content={content}
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      onOpen={fetchApiData}
    />
  );
};

export default LoadingModal;
