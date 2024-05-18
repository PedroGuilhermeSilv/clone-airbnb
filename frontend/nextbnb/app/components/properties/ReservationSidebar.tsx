const ReservationSidebar = () => {
  return (
    <aside className=" p-6 shadow-xl col-span-2 border rounded-xl border-gray-300">
      <h2 className=" mb-5 text-2xl">$200 per night</h2>
      <div className=" mb-5 border rounded-xl border-gray-300 p-3">
        <label className=" mb-2 block font-bold text-xs -ml-1">Guets</label>
        <select className=" w-full -ml-1 text-xm bg-transparent">
            <option value="one">1</option>
            <option value="one">2</option>
            <option value="one">3</option>
        </select>
      </div>
      <div className="mb-6 text-white text-center text-xl p-6 bg-airbnb text border hover:bg-airbnb-dark rounded-xl items-center">Book</div>
      <div className="flex justify-between mb-2 "><p>$200*8</p> <p>$1600</p></div>
      <div className="flex justify-between mb-3"><p>Djangobnb</p> <p>$16</p></div>
      <hr />
      <div className=" mt-1 flex justify-between font-bold"><p>Total</p> <p>$1616</p></div>
    </aside>
  );
};

export default ReservationSidebar;
