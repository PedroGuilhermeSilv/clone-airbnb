const SearchFilters = () => {
  return (
    <div className="h-[64px] flex flex-row items-center justify-between border rounded-full">
      <div className=" flex flex-row items-center justify-between">
        <div className="w-[250px] h-[64px] px-8 flex flex-col justify-center rounded-full  hover:bg-gray-100">
          <p className="text-xs font-semibold">Onde</p>
          <p className="text-sm">Buscar Destinos</p>
        </div>

        <div className=" h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
          <p className="text-xs font-semibold">Check-in</p>
          <p className="text-sm">Inserir as datas</p>
        </div>
        <div className=" h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
          <p className="text-xs font-semibold">Check-out</p>
          <p className="text-sm">Inserir as datas</p>
        </div>
      </div>
      <div className="p-2">
        <div className="p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-with">
          <svg
            viewBox="0 0 32 32"
            style={{
              display: "block",
              fill: "none",
              height: "16px",
              width: "16px",
              stroke: "currentColor",
              strokeWidth: 4,
              overflow: "visible",
            }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path
              fill="none"
              d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
