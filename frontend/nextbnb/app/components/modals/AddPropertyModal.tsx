"use client";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";
import Categories from "../addproperty/Categories";

const AddPropertyModal = () => {
  const addPropertyModal = useAddPropertyModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");

  const setCategory = (category: string) => {
    setDataCategory(category);
  };
  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl"> Choose category</h2>

          <Categories dataCategory={dataCategory} setCategory={setCategory} />

          <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6 text-2xl"> Add property details</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => setDataTitle(e.target.value)}
                className="border w-full p-2 rounded-xl border-gray-300"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                onChange={(e) => setDataDescription(e.target.value)}
                className="border h-[200px] w-full p-2 rounded-xl border-gray-300"
              ></textarea>
            </div>
          </div>
          <CustomButton
            label="Previus"
            className="bg-black mb-5 hover:bg-gray-800"
            onClick={() => setCurrentStep(1)}
          />
          <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
        </>
      ) : (
        <>asdf</>
      )}
    </>
  );
  return (
    <Modal
      isOpen={addPropertyModal.isOpen}
      close={addPropertyModal.close}
      label="Add Property"
      content={content}
    />
  );
};

export default AddPropertyModal;
