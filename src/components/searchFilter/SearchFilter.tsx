import { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { Button } from '../ui/Button'
import Filter from './Filter'
import GridView from './GridView'
import ListView from './ListView'
import VehicleStats from './VehicleStats'

export interface Car {
  id: number
  SaleCategory: string
  Make: string
  Model: string
  Branch: string
  Sold_Amount: number
  Age_Comp_Months: number
  Odometer: number
  OverallCondition: string
  YearGroup: number
  Sold_Date: string
  FuelTypeDescription: string
  GearTypeDescription: string
  Description: string
  BodyStyleDescription: string
  drivedescription: string
  VehicleDescription: string
  ConditionDescription?: string
  OptionsAccessories?: string
  LogBooks?: string
  KeysStatus?: string
  TyreFrontNearCondition?: string
  TyreFrontOffCondition?: string
  TyreRearNearCondition?: string
  TyreRearOffCondition?: string
  TyreSpareCondition?: string
  Colour: string
  EngineDescription: string
  GearNum: number
  BadgeDescription?: string
  FuelDeliveryDescription: string
  InductionDescription: string
  OwnerManualStatus?: string
  SaleType?: any
  Division: string
}

const SearchFilter = () => {
  const [page, setPage] = useState(1)
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [filteredCarsStats, setFilteredCarsStats] = useState()
  const [displayMode, setDisplayMode] = useState('list')
  const { width, height } = useWindowSize()

  return (
    <>
      {/* Filter */}
      <Filter
        page={page}
        setPage={setPage}
        filteredCars={filteredCars}
        setFilteredCars={setFilteredCars}
        setFilteredCarsStats={setFilteredCarsStats}
      ></Filter>

      {/* Vehicle Stats */}
      {filteredCars.length > 0 && (
        <VehicleStats
          filteredCarsStats={filteredCarsStats}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        ></VehicleStats>
      )}

      <Button
        onClick={() =>
          (window.location.href =
            'https://pricespeoplepay.com.au/pricing?make=ABAR&model=124')
        }
        className="block lg:hidden w-full bg-[#00a0df] font-semibold px-3 py-[0.375rem] text-[1rem] leading-6 text-white rounded-[0.2rem] mb-[15px]"
      >
        Subscribe to Generate Summary Report
      </Button>

      {/* Average Price Box */}
      <div className="mb-[15px] shadow-[0_0_10px_rgb(221,221,221)] px-4 py-[0.4rem] text-sm bg-[#ff5a60] text-white flex justify-center items-center flex-col md:flex-row">
        <div>Need a Prices People Pay Valuation Report?</div>
        <a
          href="https://pricespeoplepay.com.au/valuation-report"
          className="text-[#ff5a60] px-[1.5rem] py-[0.2rem] ml-[0.5rem] bg-white rounded-[5rem]"
        >
          Get One Now
        </a>
      </div>

      {/* No Record */}
      {filteredCars.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src="./search-empty.png" width="120"></img>
          <div className="mt-4 font-bold text-[1.17em]">
            No records available
          </div>
        </div>
      )}

      {/* List View */}
      {displayMode === 'list' &&
        width > 1024 &&
        filteredCars?.map((item, index) => {
          return <ListView car={item} key={index}></ListView>
        })}

      {/* Grid View */}
      {(displayMode === 'grid' || width <= 1024) && (
        <div className="flex flex-wrap -mx-[10px]">
          {filteredCars?.map((item, index) => {
            return <GridView car={item} key={index}></GridView>
          })}
        </div>
      )}

      {/* Load More Button */}
      {filteredCars.length > 0 && filteredCars.length % 10 === 0 && (
        <div className="flex justify-center p-6">
          <Button
            className="px-[1.8rem] py-[0.8rem] rounded-[0.2rem] text-base text-white bg-[#00a0df] border border-[#00a0df] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)] font-normal hover:bg-[#0085b9] hover:border-[#0085b9]"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  )
}

export default SearchFilter
