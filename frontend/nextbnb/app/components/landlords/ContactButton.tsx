"use client";

import apiService from "@/app/service/apiService";
import useLoginModal from "../hooks/useLoginModal";
import React from "react";
import { useRouter } from "next/navigation";

interface ContactButtonProps {
  userId?: string;
  landlord_id: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  userId,
  landlord_id,
}) => {
  const longiModel = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const response = await apiService.get(`/api/chat/start/${landlord_id}/`);
      if (response.conversation_id) {
        router.push(`/inbox/${response.conversation_id}`);
      }
    } else {
      longiModel.open();
    }
  };
  return (
    <button
      onClick={startConversation}
      className="transition cursor-pointer mt-6 p-3 pl-5 pr-5 text-white bg-airbnb rounded-lg hover:bg-airbnb-dark"
    >
      Contact
    </button>
  );
};

export default ContactButton;
