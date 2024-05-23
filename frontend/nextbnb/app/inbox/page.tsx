import Conversation from "../components/inbox/Conversation";

const InboxPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-4">
      <h1 className="pt-6 my-6 text-2xl font-medium"> Inbox</h1>
      <div className="space-y-4 ">
        <Conversation />
        <Conversation />
      </div>
    </main>
  );
};

export default InboxPage;
