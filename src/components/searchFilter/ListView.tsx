import { convertToSoldDateFormat } from '../../utils/convertDate'

interface Props {
  car: any
}

const ListView = ({ car }: Props) => {
  return (
    <div className="p-[15px] bg-white rounded-[5px] shadow-[0_0_5px_rgb(0,0,0,0.05)] flex justify-between mb-[15px]">
      <div>
        <h2 className="mb-2 text-sm font-normal">
          <strong className="font-semibold">{car.VehicleDescription}</strong>
          &nbsp;{car.Description}
        </h2>
        <div className="flex items-center">
          <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
            {car.SaleCategory}
          </div>
          <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
            {car.Odometer.toLocaleString()} Kms
          </div>
          <div className="px-[10px] py-[5px] bg-[#f5f5f5] rounded-[4px] mr-2 text-[11px] leading-[1.1]">
            {car.Branch}
          </div>
          <div className="mr-[10px] text-[12px] flex items-center">
            {car.OverallCondition === 'Excellent' ||
            car.OverallCondition === 'Above Average' ||
            car.OverallCondition === 'Good' ? (
              <img
                src="./good-condition.png"
                alt="Good"
                className="max-w-[30px] mr-2"
              ></img>
            ) : car.OverallCondition === 'Average' ? (
              <img
                src="./average-condition.png"
                alt="average"
                className="max-w-[30px] mr-2"
              ></img>
            ) : (
              <img
                src="./poor-condition.png"
                alt="poor"
                className="max-w-[30px] mr-2"
              ></img>
            )}
            {car.OverallCondition} Condition
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
            Sold {convertToSoldDateFormat(car.Sold_Date)}
          </div>
        </div>
      </div>
      <div className="flex items-center">
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
  )
}

export default ListView
