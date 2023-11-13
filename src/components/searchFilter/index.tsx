import { useState } from 'react'
import { Button } from '../ui/Button'
import Filter from './Filter'
import GridView from './GridView'
import ListView from './ListView'
import VehicleStats from './VehicleStats'

const Index = () => {
  const [page, setPage] = useState(1)
  const [filteredCars, setFilteredCars] = useState([])
  const [filteredCarsStats, setFilteredCarsStats] = useState()
  const [displayMode, setDisplayMode] = useState('list')

  return (
    <>
      {/* Filter */}
      <Filter
        page={page}
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

      {/* Average Price Box */}
      <div className="mb-[15px] shadow-[0_0_10px_rgb(221,221,221)] px-4 py-[0.4rem] text-sm bg-[#ff5a60] text-white flex justify-center items-center">
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
        filteredCars?.map((item) => {
          return <ListView car={item}></ListView>
        })}

      {/* Grid View */}
      {displayMode === 'grid' && (
        <div className="flex flex-wrap -mx-[10px]">
          {filteredCars?.map((item) => {
            return <GridView car={item}></GridView>
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

export default Index
