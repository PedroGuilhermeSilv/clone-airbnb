"use client";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import Modal from "./Modal";

const AddPropertyModal = () => {
  const addPropertyModal = useAddPropertyModal();
  return (
    <Modal
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      label="Add Property"
      content={<div>Content</div>}
    />
  );
};


export default AddPropertyModal;