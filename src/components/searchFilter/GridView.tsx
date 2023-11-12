const GridView = () => {
  return (
    <div className="flex flex-wrap -mx-[10px]">
      <div className="mb-[30px] grow-0 shrink-0 basis-1/3 max-w-[33.33333%] flex-col p-[15px] bg-white rounded-[5px] shadow-[0_0_5px_rgb(0,0,0,0.05)] flex justify-between min-h-[200px]">
        <div>
          <h2 className="mb-2 text-sm font-normal">
            <strong className="font-semibold">Audi A5 2015</strong> 8T MY15
            Sportback 5dr S tronic 7sp quattro 2.0T
          </h2>
          <div className="flex flex-col">
            <div className="flex">
              <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
                Dealership
              </div>
              <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
                61,624 Kms
              </div>
              <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
                Sold in Canning Vale (WA)
              </div>
            </div>
            <div className="flex w-full my-2">
              <div className="mr-[10px] text-[12px] flex items-center">
                <img
                  src="./good-condition.png"
                  alt="Good"
                  className="max-w-[30px] mr-2"
                ></img>
                Above Average Condition
              </div>
              <div className="mr-[0.5rem] text-[12px] flex items-center">
                <svg
                  className="mr-2"
                  id="event-24px"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_13"
                    data-name="Path 13"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                  <path
                    id="Path_14"
                    data-name="Path 14"
                    d="M17,12H12v5h5ZM16,1V3H8V1H6V3H5A1.991,1.991,0,0,0,3.01,5L3,19a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5a2.006,2.006,0,0,0-2-2H18V1Zm3,18H5V8H19Z"
                    fill="#0098dc"
                  ></path>
                </svg>
                Sold Nov 2023
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <a
            href="https://pricespeoplepay.com.au/pricing?make=AUDI&model=A5"
            className="bg-[#ff5a60] text-white border border-[#ff5a60] rounded-[0.2rem] px-2 py-1 text-sm"
          >
            Subscribe to Reveal Price
          </a>
          <a className="ml-[10px] text-[#00a0df] border border-[#00a0df] rounded-[0.2rem] px-2 py-1 text-sm">
            See More
          </a>
        </div>
      </div>
    </div>
  )
}

export default GridView
