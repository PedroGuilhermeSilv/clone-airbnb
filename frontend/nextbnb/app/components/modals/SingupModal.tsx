'use client';
import useSingupModal from "../hooks/useSingupModal";
import CustomButton from "../forms/CustomButton";
import Modal from "./Modal";

const SingupModal = () => {
  const singupModal = useSingupModal();

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
        <input
          className="rounded-xl border border-gray-100 w-full h-[54px] p-3"
          placeholder="Repeat your password"
          type="tetx"
        />
        <div className=" border p-4 rounded-xl text-white bg-airbnb-dark opacity-40">
          <p> The menssage error</p>
        </div>
        <CustomButton label="Submit" onClick={() => console.log("sing up")} />
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
