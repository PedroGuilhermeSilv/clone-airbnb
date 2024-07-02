"use client";

import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import useLoadingModal from "../hooks/useLoadingModal";
import apiService from "@/app/service/apiService";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingModalProps {
  code: string | string[];
}

const LoadingModal: React.FC<LoadingModalProps> = async ({ code }) => {
  const loginModal = useLoadingModal();
  console.log(code);

  useEffect(() => {
    const fetchCode = async () => {
      const response = await apiService.get(`/api/auth/google/?code=${code}`);
      console.log(response, "aqui");
      if (response.data) {
        loginModal.close();
      }
    };
    fetchCode();
  }),
    [code];
  const content = (
    <div className="flex justify-center">
      <ClipLoader color="#000" loading={true} size={20} />
    </div>
  );
  return (
    <Modal
      label="Loading..."
      content={content}
      isOpen={loginModal.isOpen}
      close={loginModal.close}
    />
  );
};

export default LoadingModal;
