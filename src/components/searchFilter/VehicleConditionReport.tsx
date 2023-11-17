import { convertToCarBasicInformationFormat } from '../../utils/convertDate'
import { Button } from '../ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog'
import { Car } from './SearchFilter'

interface Props {
  car: Car
}

const VehicleConditionReport = ({ car }: Props) => {
  const basicInformation = {
    Make: car.Make,
    Model: car.Model,
    Year: car.YearGroup,
    Description: car.Description,
    Colour: car.Colour,
    Engine: `${car.EngineDescription} ${car.FuelDeliveryDescription} ${car.InductionDescription} ${car.FuelTypeDescription}`,
    Transmission: `${car.GearNum} ${car.GearTypeDescription}`,
    Odometer: `${car.Odometer.toLocaleString()} Kms`,
    'Sale Date': convertToCarBasicInformationFormat(car.Sold_Date),
    Accessories: car.OptionsAccessories,
    'Auction Information': car.BadgeDescription,
  }

  const tyreCondition = {
    'Left Front': car.TyreFrontNearCondition,
    'Left Rear': car.TyreRearNearCondition,
    'Right Front': car.TyreFrontOffCondition,
    'Right Rear': car.TyreRearOffCondition,
    Spare: car.TyreSpareCondition,
  }

  const keysAndBooks = {
    'Log Books': car.LogBooks,
    'Owners Manual': car.OwnerManualStatus,
    Keys: car.KeysStatus,
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-[10px] text-[#00a0df] border border-[#00a0df] rounded-[0.2rem] px-2 py-1 text-sm h-fit"
        >
          See More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] bg-white w-[80vw] lg:max-w-[1000px] p-5">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row">
              <div className="text-lg lg:text-[22px] font-bold">
                Vehicle Condition Report
              </div>
              <Button
                onClick={() =>
                  (window.location.href = `https://pricespeoplepay.com.au/pricing?make=${car.Make}&model=${car.Model}`)
                }
                className="w-fit h-[33px] mt-1 lg:mt-0 mr-10 bg-[#ff5a60] hover:bg-[#ff5a60] hover:border-[#ff5a60] border font-bold px-2 py-1 text-sm leading-6 border-[#ff5a60] text-white rounded-[0.2rem]"
              >
                Subscribe to Reveal Price
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-auto overflow-x-hidden">
          {/*  Vehicle Basic Information */}
          <div className="mb-4 w-full lg:border lg:border-b-[#e5e5e5]">
            {Object.entries(basicInformation).map((item, index) => {
              return (
                <div
                  className="border-b border-b-[#e5e5e5] lg:border lg:border-[#e5e5e5] lg:border-b-0 flex flex-col lg:flex-row py-[7px] lg:py-0"
                  key={index}
                >
                  <div className="lg:bg-[#f9f9f9] lg:p-[10px] text-sm flex-grow-0 flex-shrink-0 lg:basis-[160px] font-bold lg:border-r lg:border-r-[#e5e5e5]">
                    {item[0]}
                  </div>
                  <div className="lg:p-[10px] text-sm">{item[1] ?? '--'}</div>
                </div>
              )
            })}
          </div>

          {/* Vehicle Condition */}
          <div className="w-full mb-[15px]">
            <div className="text-[1.17em] font-bold mb-2">
              Vehicle Condition
            </div>
            {car.ConditionDescription ? (
              <div className="flex flex-wrap items-center -m-1">
                {car.ConditionDescription?.split(',').map((item, index) => {
                  return (
                    <div
                      className="rounded-[5px] bg-[#ff5a60] text-white text-[13px] leading-[1.2] px-2 py-[5px] mr-[5px] mb-[5px] min-h-[32px] flex items-center"
                      key={index}
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>--</div>
            )}
          </div>

          <div className="flex flex-wrap -mx-[10px]">
            {/* Tyre Condition */}
            <div className="flex-grow-0 flex-shrink-0 basis-full lg:basis-[50%] lg:max-w-[50%] px-[10px]">
              <div className="text-[1.17em] font-bold mb-2">Tyre Condition</div>
              <div className="mb-4 w-full border border-b-[#e5e5e5]">
                {Object.entries(tyreCondition).map((item, index) => {
                  return (
                    <div
                      className="border border-[#e5e5e5] flex border-b-0"
                      key={index}
                    >
                      <div className="bg-[#f9f9f9] p-[10px] text-sm flex-grow-0 flex-shrink-0 basis-[80px] lg:basis-[160px] font-bold border-r border-r-[#e5e5e5]">
                        {item[0]}
                      </div>
                      <div className="p-[10px] text-sm">{item[1] ?? '--'}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Keys & Books */}
            <div className="flex-grow-0 flex-shrink-0 basis-full lg:basis-[50%] lg:max-w-[50%] px-[10px]">
              <div className="text-[1.17em] font-bold mb-2">Keys & Books</div>
              <div className="mb-4 w-full border border-b-[#e5e5e5]">
                {Object.entries(keysAndBooks).map((item, index) => {
                  return (
                    <div
                      className="border border-[#e5e5e5] flex border-b-0"
                      key={index}
                    >
                      <div className="bg-[#f9f9f9] p-[10px] text-sm flex-grow-0 flex-shrink-0 basis-[80px] lg:basis-[160px] font-bold border-r border-r-[#e5e5e5]">
                        {item[0]}
                      </div>
                      <div className="p-[10px] text-sm">{item[1] ?? '--'}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VehicleConditionReport
