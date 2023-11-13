import { format, sub } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Calendar } from '../ui/Calendar'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'
import { Slider } from '../ui/Slider'

interface Props {
  page: number
  filteredCars: any
  setFilteredCars: Function
  setFilteredCarsStats: Function
}

const Filter = ({
  page,
  filteredCars,
  setFilteredCars,
  setFilteredCarsStats,
}: Props) => {
  const [yearErrorMessage, setYearErrorMessage] = useState('')
  const [odometerErrorMessage, setOdometerErrorMessage] = useState('')
  const [applyFilterErrorMessage, setApplyFilterErrorMessage] = useState('')
  const [make, setMake] = useState('')
  const [makeSelectItems, setMakeSelectItems] = useState([
    'Make',
    'Audi',
    'BMW',
    'Volvo',
  ])
  const [family, setFamily] = useState('')
  const [familySelectItems, setFamilySelectItems] = useState([])
  const [badge, setBadge] = useState('')
  const [badgesSelectItems, setBadgesSelectItems] = useState([])
  const [initMinYear, setInitMinYear] = useState(1950)
  const [initMaxYear, setInitMaxYear] = useState(2023)
  const [minYear, setMinYear] = useState(1950)
  const [maxYear, setMaxYear] = useState(2023)
  const [bodyType, setBodyType] = useState('')
  const [bodyTypeSelectItems, setBodyTypeSelectItems] = useState([])
  const [bodyTypeConfig, setBodyTypeConfig] = useState('')
  const [bodyTypeConfigSelectItems, setBodyTypeConfigSelectItems] = useState([])
  const [fuelType, setFuelType] = useState('')
  const [fuelTypeSelectItems, setFuelTypeSelectItems] = useState([])
  const [transmission, setTransmission] = useState('')
  const [transmissionSelectItems, setTransmissionSelectItems] = useState([])
  const [engine, setEngine] = useState('')
  const [engineSelectItems, setEngineSelectItems] = useState([])
  const [cylinders, setCylinders] = useState('')
  const [cylindersSelectItems, setCylindersSelectItems] = useState([])
  const [division, setDivision] = useState('')
  const [divisionSelectItems, setDivisionSelectItems] = useState([])
  const [drive, setDrive] = useState('')
  const [driveSelectItems, setDriveSelectItems] = useState([])
  const [seat, setSeat] = useState('')
  const [seatSelectItems, setSeatSelectItems] = useState([])
  const [doors, setDoors] = useState('')
  const [doorsSelectItems, setDoorsSelectItems] = useState([])
  const [initMinOdometer, setInitMinOdometer] = useState(0)
  const [initMaxOdometer, setInitMaxOdometer] = useState(700000)
  const [minOdometer, setMinOdometer] = useState(0)
  const [maxOdometer, setMaxOdometer] = useState(700000)
  const [states, setStates] = useState('')
  const [statesSelectItems, setStatesSelectItems] = useState([])
  const [saleCategory, setSaleCategory] = useState('')
  const [saleCategorySelectItems, setSaleCategorySelectItems] = useState([])
  const [minSoldDate, setMinSoldDate] = useState(sub(new Date(), { days: 7 }))
  const [maxSoldDate, setMaxSoldDate] = useState(new Date())
  const [sort, setSort] = useState('')
  const [sortSelectItems, setSortSelectItems] = useState([
    'Sort',
    'Sold Date',
    'Age',
    'Odometer',
  ])
  const [orderBy, setOrderBy] = useState('')
  const [orderBySelectItems, setOrderBySelectItems] = useState([
    'Order By',
    'Asc',
    'Desc',
  ])
  const [search, setSearch] = useState('')

  // When make is selected, send a request to get the corresponding family
  useEffect(() => {
    const fetchFamiliesData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/car/family?make=${make}`
        )
        const jsonData = await response.json()
        jsonData.data.unshift('Family')
        setFamilySelectItems(jsonData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    setFamily('')
    fetchFamiliesData()
  }, [make])

  // When family is selected, send a request to get the corresponding filter information
  useEffect(() => {
    const fetchFilterInformationData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/car/filter-information?make=${make}&family=${family}`
        )
        const jsonData = await response.json()
        const {
          min_year,
          max_year,
          fuelType,
          min_odometer,
          max_odometer,
          saleCategory,
          transmissionType,
          stateType,
          badge,
          bodyFilter,
          seatFilter,
          driveDescription,
          engineDescription,
          min_sold_date,
          max_sold_date,
          NVIC,
          division,
          bodyConfigDescription,
          doorNum,
          cylinders,
        } = jsonData.data

        if (min_year === 0) {
          setMinYear(1950)
        } else {
          setMinYear(min_year)
        }
        if (max_year === 0) {
          setMinYear(new Date().getFullYear())
        } else {
          setMaxYear(max_year)
        }

        setInitMinYear(min_year)
        setInitMaxYear(max_year)
        badge.unshift('Badges')
        setBadgesSelectItems(badge)
        bodyFilter.unshift('Body Type')
        setBodyTypeSelectItems(bodyFilter)
        bodyConfigDescription.unshift('Body Type Config')
        setBodyTypeConfigSelectItems(bodyConfigDescription)
        fuelType.unshift('Fuel Type')
        setFuelTypeSelectItems(fuelType)
        transmissionType.unshift('Transmission')
        setTransmissionSelectItems(transmissionType)
        engineDescription.unshift('Engine')
        setEngineSelectItems(engineDescription)
        cylinders.unshift('Cylinders')
        setCylindersSelectItems(cylinders)
        division.unshift('Division')
        setDivisionSelectItems(division)
        driveDescription.unshift('Drive')
        setDriveSelectItems(driveDescription)
        seatFilter.unshift('Seat')
        setSeatSelectItems(seatFilter)
        doorNum.unshift('Doors')
        setDoorsSelectItems(doorNum)
        setInitMinOdometer(min_odometer)
        setInitMaxOdometer(max_odometer)
        setMinOdometer(min_odometer)
        setMaxOdometer(max_odometer)
        stateType.unshift('States')
        setStatesSelectItems(stateType)
        saleCategory.unshift('Sale Category')
        setSaleCategorySelectItems(saleCategory)
        if (min_sold_date === '') {
          setMinSoldDate(sub(new Date(), { days: 7 }))
        } else {
          setMinSoldDate(new Date(min_sold_date))
        }
        if (max_sold_date === '') {
          setMaxSoldDate(new Date())
        } else {
          setMaxSoldDate(new Date(max_sold_date))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    if (make !== '' && family !== '') {
      onClearFilter(false)
      fetchFilterInformationData()
    }
  }, [family])

  useEffect(() => {
    if (page > 1) {
      onApplyFilter()
    }
  }, [page])

  // Get eligible cars based on these filters
  const onApplyFilter = () => {
    const fetchCarsData = async () => {
      try {
        let query = `?Make=${make}&Model=${family}&min_year=${minYear}&max_year=${maxYear}&min_odometer=${minOdometer}&max_odometer=${maxOdometer}&page=${page}&sortBy=${orderBy}&orderBy=${orderBy}&min_sold_date=${minSoldDate}&max_sold_date=${maxSoldDate}`
        if (engine.trim() !== '') {
          query += `&EngineDescription=${engine}`
        }
        if (fuelType.trim() !== '') {
          query += `&FuelTypeDescription=${fuelType}`
        }
        if (saleCategory.trim() !== '') {
          query += `&SaleCategory=${saleCategory}`
        }
        if (transmission.trim() !== '') {
          query += `&GearTypeDescription=${transmission}`
        }
        if (badge.trim() !== '') {
          query += `&BadgeDescription=${badge}`
        }
        if (states.trim() !== '') {
          query += `&Branch=${states}`
        }
        if (bodyType.trim() !== '') {
          query += `&BodyStyleDescription=${bodyType}`
        }
        if (search !== '') {
          query += `&keyword=${search}`
        }
        if (division.trim() !== '') {
          query += `&Division=${division}`
        }
        if (drive.trim() !== '') {
          query += `&drivedescription=${drive}`
        }

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/car/search-all${query}`
        )
        const jsonData = await response.json()
        setFilteredCars([...filteredCars, ...jsonData.carData])
        setFilteredCarsStats(jsonData.carStatsData[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    if (make !== '' && family !== '') {
      fetchCarsData()
    } else {
      setApplyFilterErrorMessage('Please choose make and model')
    }
  }

  // Clear the existing filter options
  const onClearFilter = (clickButton: boolean) => {
    if (clickButton) {
      setMake('')
      setFamily('')
      setSort('')
      setOrderBy('')
    }
    setMinYear(1950)
    setMaxYear(new Date().getFullYear())
    setInitMinYear(1950)
    setInitMaxYear(new Date().getFullYear())
    setBadge('')
    setBodyType('')
    setBodyTypeConfig('')
    setFuelType('')
    setTransmission('')
    setEngine('')
    setCylinders('')
    setDivision('')
    setDrive('')
    setSeat('')
    setDoors('')
    setInitMinOdometer(0)
    setInitMaxOdometer(70000)
    setMinOdometer(0)
    setMaxOdometer(70000)
    setStates('')
    setSaleCategory('')
    setSearch('')
  }

  return (
    <>
      {/* PC View */}
      <div className="hidden lg:block w-full mb-[15px]">
        <div className="flex flex-wrap items-center">
          {/* Make */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                if (value !== make) {
                  setMake(value)
                }
              }}
              value={make}
            >
              <SelectTrigger>
                <SelectValue placeholder="Make" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {makeSelectItems.map((item, index) => {
                    if (index === 0) {
                      return (
                        <SelectLabel key={index} className="text-[#00000061]">
                          {item}
                        </SelectLabel>
                      )
                    } else {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      )
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Family */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                if (value !== family) {
                  setFamily(value)
                }
              }}
              value={family}
            >
              <SelectTrigger>
                <SelectValue placeholder="Family" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {familySelectItems.map((item, index) => {
                    if (index === 0) {
                      return (
                        <SelectLabel key={index} className="text-[#00000061]">
                          {item}
                        </SelectLabel>
                      )
                    } else {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      )
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
            <Select>
              <SelectTrigger className="data-[placeholder]:text-[#212529]">
                <SelectValue placeholder={`${minYear} | ${maxYear}`} />
              </SelectTrigger>
              {family !== '' && (
                <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[230px]">
                  <div className="flex justify-between gap-2">
                    <Input
                      className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                      placeholder="Year"
                      value={minYear}
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          if (
                            e.target.value.length !== 4 ||
                            parseInt(e.target.value) < 1950 ||
                            parseInt(e.target.value) > new Date().getFullYear()
                          ) {
                            setYearErrorMessage('Invalid Year')
                          } else {
                            setYearErrorMessage('')
                          }
                          setMinYear(parseInt(e.target.value))
                        }
                      }}
                    />
                    <Input
                      className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                      placeholder="Year"
                      value={maxYear}
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          if (
                            e.target.value.length !== 4 ||
                            parseInt(e.target.value) < 1950 ||
                            parseInt(e.target.value) > new Date().getFullYear()
                          ) {
                            setYearErrorMessage('Invalid Year')
                          } else {
                            setYearErrorMessage('')
                          }
                          setMaxYear(parseInt(e.target.value))
                        }
                      }}
                    />
                  </div>
                  <div className="text-[#dc100f] text-[0.8rem]">
                    {yearErrorMessage}
                  </div>
                  {minYear !== maxYear && (
                    <Slider
                      defaultValue={[minYear, maxYear]}
                      min={initMinYear}
                      max={initMaxYear}
                      step={1}
                      value={[minYear, maxYear]}
                      onValueChange={(values) => {
                        setMinYear(values[0])
                        setMaxYear(values[1])
                      }}
                      className="mt-2"
                    />
                  )}
                </SelectContent>
              )}
            </Select>
          </div>

          {/* Badges */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setBadge(value)
              }}
              value={badge}
            >
              <SelectTrigger
                className={`${badge}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Badges" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {badgesSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Body type */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setBodyType(value)
              }}
              value={bodyType}
            >
              <SelectTrigger
                className={`${bodyType}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Body Type" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {bodyTypeSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Body Type Config */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setBodyTypeConfig(value)
              }}
              value={bodyTypeConfig}
            >
              <SelectTrigger
                className={`${bodyTypeConfig}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Body Type Config" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {bodyTypeConfigSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Fuel Type */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setFuelType(value)
              }}
              value={fuelType}
            >
              <SelectTrigger
                className={`${fuelType}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {fuelTypeSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Transmission */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setTransmission(value)
              }}
              value={transmission}
            >
              <SelectTrigger
                className={`${transmission}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Transmission" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {transmissionSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Engine */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setEngine(value)
              }}
              value={engine}
            >
              <SelectTrigger
                className={`${engine}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Engine" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {engineSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cylinders */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setCylinders(value)
              }}
              value={cylinders}
            >
              <SelectTrigger
                className={`${cylinders}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Cylinders" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {cylindersSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Division */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setDivision(value)
              }}
              value={division}
            >
              <SelectTrigger
                className={`${division}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Division" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {divisionSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Drive */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setDrive(value)
              }}
              value={drive}
            >
              <SelectTrigger
                className={`${drive}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Drive" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {driveSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Seat */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setSeat(value)
              }}
              value={seat}
            >
              <SelectTrigger className={`${seat}` === ' ' ? 'text-[#aaa]' : ''}>
                <SelectValue placeholder="Seat" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {seatSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Doors */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setDoors(value)
              }}
              value={doors}
            >
              <SelectTrigger
                className={`${doors}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Doors" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {doorsSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Odometer */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
            <Select>
              <SelectTrigger className="data-[placeholder]:text-[#212529]">
                <SelectValue placeholder="Odometer" />
              </SelectTrigger>
              {family !== '' && (
                <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[230px]">
                  <div className="flex justify-between gap-2">
                    <Input
                      className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                      placeholder="Odometer"
                      value={minOdometer}
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          if (parseInt(e.target.value) > 700000) {
                            setOdometerErrorMessage('Invalid Odometer')
                          } else {
                            setOdometerErrorMessage('')
                          }
                          setMinOdometer(parseInt(e.target.value))
                        }
                      }}
                    />
                    <Input
                      className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                      placeholder="Odometer"
                      value={maxOdometer}
                      onChange={(e) => {
                        if (e.target.value.length !== 0) {
                          if (parseInt(e.target.value) > 700000) {
                            setOdometerErrorMessage('Invalid Odometer')
                          } else {
                            setOdometerErrorMessage('')
                          }
                          setMaxOdometer(parseInt(e.target.value))
                        }
                      }}
                    />
                  </div>
                  <div className="text-[#dc100f] text-[0.8rem]">
                    {odometerErrorMessage}
                  </div>
                  {minOdometer !== maxOdometer && (
                    <Slider
                      defaultValue={[minOdometer, maxOdometer]}
                      min={initMinOdometer}
                      max={initMaxOdometer}
                      step={1}
                      value={[minOdometer, maxOdometer]}
                      onValueChange={(values) => {
                        setMinOdometer(values[0])
                        setMaxOdometer(values[1])
                      }}
                      className="mt-2"
                    />
                  )}
                </SelectContent>
              )}
            </Select>
          </div>

          {/* States */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setStates(value)
              }}
              value={states}
            >
              <SelectTrigger
                className={`${states}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="States" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {statesSelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Sale Category */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setSaleCategory(value)
              }}
              value={saleCategory}
            >
              <SelectTrigger
                className={`${saleCategory}` === ' ' ? 'text-[#aaa]' : ''}
              >
                <SelectValue placeholder="Sale Category" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {saleCategorySelectItems.map((item, index) => {
                    return (
                      <SelectItem key={index} value={index === 0 ? ' ' : item}>
                        {item}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Sale Date */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
            <Select>
              <SelectTrigger className="data-[placeholder]:text-[#212529]">
                <SelectValue placeholder="Sale Date" />
              </SelectTrigger>
              <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[170px]">
                <>
                  <RadioGroup
                    defaultValue="7"
                    onValueChange={(value) => {
                      if (value === '7') {
                        setMinSoldDate(sub(new Date(), { days: 7 }))
                      } else if (value === '30') {
                        setMinSoldDate(sub(new Date(), { days: 30 }))
                      } else if (value === '90') {
                        setMinSoldDate(sub(new Date(), { days: 90 }))
                      }
                    }}
                    className="mb-4"
                  >
                    <div className="flex items-center space-x-2 text-[13px]">
                      <RadioGroupItem value="7" id="r1" />
                      <Label htmlFor="r1" className="text-[13px]">
                        Last 7 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30" id="r2" />
                      <Label htmlFor="r2" className="text-[13px]">
                        Last 30 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="90" id="r3" />
                      <Label htmlFor="r3" className="text-[13px]">
                        Last 90 days
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex flex-col">
                    <div className="text-[13px]">Min</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[150px] pl-3 text-left font-normal',
                            !minSoldDate && 'text-muted-foreground'
                          )}
                        >
                          {minSoldDate ? (
                            format(minSoldDate, 'dd/MM/yyyy')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={minSoldDate}
                          onSelect={(value) => {
                            if (value) {
                              setMinSoldDate(value)
                            }
                          }}
                          disabled={(date) =>
                            date > maxSoldDate || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-[13px]">Max</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[150px] pl-3 text-left font-normal',
                            !maxSoldDate && 'text-muted-foreground'
                          )}
                        >
                          {maxSoldDate ? (
                            format(maxSoldDate, 'dd/MM/yyyy')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={maxSoldDate}
                          onSelect={(value) => {
                            if (value) {
                              setMaxSoldDate(value)
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < minSoldDate
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setSort(value)
              }}
              value={sort}
            >
              <SelectTrigger className="data-[placeholder]:text-[#212529]">
                <SelectValue placeholder="Sort | Sold Date" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {sortSelectItems.map((item, index) => {
                    if (index === 0) {
                      return (
                        <SelectLabel key={index} className="text-[#00000061]">
                          {item}
                        </SelectLabel>
                      )
                    } else {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      )
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Order By */}
          <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
            <Select
              onValueChange={(value) => {
                setOrderBy(value)
              }}
              value={orderBy}
            >
              <SelectTrigger className="data-[placeholder]:text-[#212529]">
                <SelectValue placeholder="Order By | Desc" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectGroup>
                  {orderBySelectItems.map((item, index) => {
                    if (index === 0) {
                      return (
                        <SelectLabel key={index} className="text-[#00000061]">
                          {item}
                        </SelectLabel>
                      )
                    } else {
                      return (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      )
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          {/* Search */}
          <div className="mt-[11px] mr-[10px] py-1 w-[42.3%] h-[38px] bg-white border border-[#adb5bd] rounded-[4px]">
            <Input
              className="h-full border-none placeholder:text-[#aaa]"
              placeholder="e.g. Metallic Paint,Power front seats,Power Sunroof, ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Button Group */}
          <div className="mt-2">
            <Button
              className="h-[38px] bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
              onClick={onApplyFilter}
            >
              Apply Filter
            </Button>
            <Button
              className="h-[38px] ml-4 bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
              onClick={() => onClearFilter(true)}
            >
              Clear Filter
            </Button>
            <Button
              onClick={() =>
                (window.location.href =
                  'https://pricespeoplepay.com.au/pricing?make=ABAR&model=124')
              }
              className="h-[38px] ml-4 bg-[#ff5a60] hover:bg-[#ff5a60] hover:border-[#ff5a60] border font-semibold px-3 py-[0.375rem] text-[1rem] leading-6 border-[#ff5a60] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
            >
              Subscribe to Generate Summary Report
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="drawer lg:hidden  -mt-[15px]">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="flex items-center bg-[#00a0df] px-[15px] py-[10px] -mx-5 text-white mb-[15px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.913"
              height="16"
              viewBox="0 0 15.913 16"
            >
              <path
                id="Path_5"
                data-name="Path 5"
                d="M4.25,5.61C6.27,8.2,10,13,10,13v6a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V13s3.72-4.8,5.74-7.39A1,1,0,0,0,18.95,4H5.04A1,1,0,0,0,4.25,5.61Z"
                transform="translate(-4.038 -4)"
                fill="#fff"
              ></path>
            </svg>
            Filters
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="min-h-full p-5 menu w-full max-w-[280px] text-base-content bg-white shadow-[0_0_15px_rgb(0,0,0,0.2)]">
            {/* Make */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    if (value !== make) {
                      setMake(value)
                    }
                  }}
                  value={make}
                >
                  <SelectTrigger className="w-[240px] -ml-5">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {makeSelectItems.map((item, index) => {
                        if (index === 0) {
                          return (
                            <SelectLabel
                              key={index}
                              className="text-[#00000061]"
                            >
                              {item}
                            </SelectLabel>
                          )
                        } else {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        }
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Family */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    if (value !== family) {
                      setFamily(value)
                    }
                  }}
                  value={family}
                >
                  <SelectTrigger className="w-[240px] -ml-5">
                    <SelectValue placeholder="Family" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {familySelectItems.map((item, index) => {
                        if (index === 0) {
                          return (
                            <SelectLabel
                              key={index}
                              className="text-[#00000061]"
                            >
                              {item}
                            </SelectLabel>
                          )
                        } else {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        }
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Year */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select>
                  <SelectTrigger className="data-[placeholder]:text-[#212529] w-[240px] -ml-5">
                    <SelectValue placeholder={`${minYear} | ${maxYear}`} />
                  </SelectTrigger>
                  {family !== '' && (
                    <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[240px]">
                      <div className="flex justify-between gap-1">
                        <Input
                          className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px] w-[40%]"
                          placeholder="Year"
                          value={minYear}
                          onChange={(e) => {
                            if (e.target.value.length !== 0) {
                              if (
                                e.target.value.length !== 4 ||
                                parseInt(e.target.value) < 1950 ||
                                parseInt(e.target.value) >
                                  new Date().getFullYear()
                              ) {
                                setYearErrorMessage('Invalid Year')
                              } else {
                                setYearErrorMessage('')
                              }
                              setMinYear(parseInt(e.target.value))
                            }
                          }}
                        />
                        <Input
                          className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px] w-[40%]"
                          placeholder="Year"
                          value={maxYear}
                          onChange={(e) => {
                            if (e.target.value.length !== 0) {
                              if (
                                e.target.value.length !== 4 ||
                                parseInt(e.target.value) < 1950 ||
                                parseInt(e.target.value) >
                                  new Date().getFullYear()
                              ) {
                                setYearErrorMessage('Invalid Year')
                              } else {
                                setYearErrorMessage('')
                              }
                              setMaxYear(parseInt(e.target.value))
                            }
                          }}
                        />
                      </div>
                      <div className="text-[#dc100f] text-[0.8rem]">
                        {yearErrorMessage}
                      </div>
                      {minYear !== maxYear && (
                        <Slider
                          defaultValue={[minYear, maxYear]}
                          min={initMinYear}
                          max={initMaxYear}
                          step={1}
                          value={[minYear, maxYear]}
                          onValueChange={(values) => {
                            setMinYear(values[0])
                            setMaxYear(values[1])
                          }}
                          className="mt-2"
                        />
                      )}
                    </SelectContent>
                  )}
                </Select>
              </div>
            </li>

            {/* Badges */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setBadge(value)
                  }}
                  value={badge}
                >
                  <SelectTrigger
                    className={`${
                      badge === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Badges" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {badgesSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Body type */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setBodyType(value)
                  }}
                  value={bodyType}
                >
                  <SelectTrigger
                    className={`${
                      bodyType === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Body Type" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {bodyTypeSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Body Type Config */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setBodyTypeConfig(value)
                  }}
                  value={bodyTypeConfig}
                >
                  <SelectTrigger
                    className={`${
                      bodyTypeConfig === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Body Type Config" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {bodyTypeConfigSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Fuel Type */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setFuelType(value)
                  }}
                  value={fuelType}
                >
                  <SelectTrigger
                    className={`${
                      fuelType === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {fuelTypeSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Transmission */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setTransmission(value)
                  }}
                  value={transmission}
                >
                  <SelectTrigger
                    className={`${
                      transmission === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {transmissionSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Engine */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setEngine(value)
                  }}
                  value={engine}
                >
                  <SelectTrigger
                    className={`${
                      engine === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Engine" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {engineSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Cylinders */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setCylinders(value)
                  }}
                  value={cylinders}
                >
                  <SelectTrigger
                    className={`${
                      cylinders === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Cylinders" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {cylindersSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Division */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setDivision(value)
                  }}
                  value={division}
                >
                  <SelectTrigger
                    className={`${
                      division === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Division" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {divisionSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Drive */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setDrive(value)
                  }}
                  value={drive}
                >
                  <SelectTrigger
                    className={`${
                      drive === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Drive" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {driveSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Seat */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setSeat(value)
                  }}
                  value={seat}
                >
                  <SelectTrigger
                    className={`${
                      seat === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Seat" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {seatSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Doors */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setDoors(value)
                  }}
                  value={doors}
                >
                  <SelectTrigger
                    className={`${
                      doors === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Doors" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {doorsSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Odometer */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select>
                  <SelectTrigger className="data-[placeholder]:text-[#212529] w-[240px] -ml-5">
                    <SelectValue placeholder="Odometer" />
                  </SelectTrigger>
                  {family !== '' && (
                    <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[230px]">
                      <div className="flex justify-between gap-2">
                        <Input
                          className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                          placeholder="Odometer"
                          value={minOdometer}
                          onChange={(e) => {
                            if (e.target.value.length !== 0) {
                              if (parseInt(e.target.value) > 700000) {
                                setOdometerErrorMessage('Invalid Odometer')
                              } else {
                                setOdometerErrorMessage('')
                              }
                              setMinOdometer(parseInt(e.target.value))
                            }
                          }}
                        />
                        <Input
                          className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                          placeholder="Odometer"
                          value={maxOdometer}
                          onChange={(e) => {
                            if (e.target.value.length !== 0) {
                              if (parseInt(e.target.value) > 700000) {
                                setOdometerErrorMessage('Invalid Odometer')
                              } else {
                                setOdometerErrorMessage('')
                              }
                              setMaxOdometer(parseInt(e.target.value))
                            }
                          }}
                        />
                      </div>
                      <div className="text-[#dc100f] text-[0.8rem]">
                        {odometerErrorMessage}
                      </div>
                      {minOdometer !== maxOdometer && (
                        <Slider
                          defaultValue={[minOdometer, maxOdometer]}
                          min={initMinOdometer}
                          max={initMaxOdometer}
                          step={1}
                          value={[minOdometer, maxOdometer]}
                          onValueChange={(values) => {
                            setMinOdometer(values[0])
                            setMaxOdometer(values[1])
                          }}
                          className="mt-2"
                        />
                      )}
                    </SelectContent>
                  )}
                </Select>
              </div>
            </li>

            {/* States */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setStates(value)
                  }}
                  value={states}
                >
                  <SelectTrigger
                    className={`${
                      states === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="States" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {statesSelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Sale Category */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setSaleCategory(value)
                  }}
                  value={saleCategory}
                >
                  <SelectTrigger
                    className={`${
                      saleCategory === ' ' ? 'text-[#aaa]' : ''
                    } w-[240px] -ml-5`}
                  >
                    <SelectValue placeholder="Sale Category" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {saleCategorySelectItems.map((item, index) => {
                        return (
                          <SelectItem
                            key={index}
                            value={index === 0 ? ' ' : item}
                          >
                            {item}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Sale Date */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select>
                  <SelectTrigger className="data-[placeholder]:text-[#212529] w-[240px] -ml-5">
                    <SelectValue placeholder="Sale Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[170px]">
                    <>
                      <RadioGroup
                        defaultValue="7"
                        onValueChange={(value) => {
                          if (value === '7') {
                            setMinSoldDate(sub(new Date(), { days: 7 }))
                          } else if (value === '30') {
                            setMinSoldDate(sub(new Date(), { days: 30 }))
                          } else if (value === '90') {
                            setMinSoldDate(sub(new Date(), { days: 90 }))
                          }
                        }}
                        className="mb-4"
                      >
                        <div className="flex items-center space-x-2 text-[13px]">
                          <RadioGroupItem value="7" id="r1" />
                          <Label htmlFor="r1" className="text-[13px]">
                            Last 7 days
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="30" id="r2" />
                          <Label htmlFor="r2" className="text-[13px]">
                            Last 30 days
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="90" id="r3" />
                          <Label htmlFor="r3" className="text-[13px]">
                            Last 90 days
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex flex-col">
                        <div className="text-[13px]">Min</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[150px] pl-3 text-left font-normal',
                                !minSoldDate && 'text-muted-foreground'
                              )}
                            >
                              {minSoldDate ? (
                                format(minSoldDate, 'dd/MM/yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={minSoldDate}
                              onSelect={(value) => {
                                if (value) {
                                  setMinSoldDate(value)
                                }
                              }}
                              disabled={(date) =>
                                date > maxSoldDate ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex flex-col">
                        <div className="text-[13px]">Max</div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[150px] pl-3 text-left font-normal',
                                !maxSoldDate && 'text-muted-foreground'
                              )}
                            >
                              {maxSoldDate ? (
                                format(maxSoldDate, 'dd/MM/yyyy')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={maxSoldDate}
                              onSelect={(value) => {
                                if (value) {
                                  setMaxSoldDate(value)
                                }
                              }}
                              disabled={(date) =>
                                date > new Date() || date < minSoldDate
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Sort */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setSort(value)
                  }}
                  value={sort}
                >
                  <SelectTrigger className="data-[placeholder]:text-[#212529] w-[240px] -ml-5">
                    <SelectValue placeholder="Sort | Sold Date" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {sortSelectItems.map((item, index) => {
                        if (index === 0) {
                          return (
                            <SelectLabel
                              key={index}
                              className="text-[#00000061]"
                            >
                              {item}
                            </SelectLabel>
                          )
                        } else {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        }
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Order By */}
            <li>
              <div className="w-full mb-[15px] h-[38px] block">
                <Select
                  onValueChange={(value) => {
                    setOrderBy(value)
                  }}
                  value={orderBy}
                >
                  <SelectTrigger className="data-[placeholder]:text-[#212529] w-[240px] -ml-5">
                    <SelectValue placeholder="Order By | Desc" />
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    <SelectGroup>
                      {orderBySelectItems.map((item, index) => {
                        if (index === 0) {
                          return (
                            <SelectLabel
                              key={index}
                              className="text-[#00000061]"
                            >
                              {item}
                            </SelectLabel>
                          )
                        } else {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          )
                        }
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </li>

            {/* Search */}
            <li>
              <div className="w-[240px] mb-[15px] h-[38px] block mt-[11px] mr-[10px] py-1 bg-white border border-[#adb5bd] rounded-[4px]">
                <Input
                  className="h-full border-none placeholder:text-[#aaa]"
                  placeholder="e.g. Metallic Paint,Power front seats,Power Sunroof, ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </li>
            <li>
              {/* Button Group */}
              <div className="flex flex-col items-start px-0 mt-2">
                <Button
                  className="w-[120px] h-[38px] bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
                  onClick={onApplyFilter}
                >
                  Apply Filter
                </Button>
                <Button
                  className="w-[120px] h-[38px] bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
                  onClick={() => onClearFilter(true)}
                >
                  Clear Filter
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Toast */}
      {applyFilterErrorMessage && (
        <div className="toast toast-center">
          <div className="bg-[#323232] text-[#b7b7b7] px-6 py-2 rounded-[0.2rem] text-[14px]">
            <span>{applyFilterErrorMessage}</span>
            <button
              className="bg-[#efefef] text-[#404040] text-[0.9rem] px-6 py-2 w-[100px] ml-4 rounded-[0.2rem]"
              onClick={() => {
                setApplyFilterErrorMessage('')
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Filter
