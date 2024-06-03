"use client";
import useAddPropertyModal from "../hooks/useAddPropertyModal";

const AddPropertyButton = () => {
  const addPropertyModal = useAddPropertyModal();
  const airbnbModal = () => {
    addPropertyModal.open();
  };
  return (
    <div
      onClick={airbnbModal}
      className="p-2 text-sm cursor-pointer font-semibold rounded-full hover:bg-gray-200"
    >
      Djangobnb your home
    </div>
  );
};

export default AddPropertyButton;
