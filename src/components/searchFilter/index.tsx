import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, sub } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Calendar } from '../ui/Calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup'
import { Slider } from '../ui/Slider'
import { toast } from '../ui/UseToast'
import GridView from './GridView'
import ListView from './ListView'
import VehicleStats from './VehicleStats'

const FormSchema = z.object({
  make: z.string({
    required_error: 'Please select the make.',
  }),
  family: z.string({
    required_error: 'Please select the family.',
  }),
  minYear: z.number({
    required_error: 'Please select the latest production year.',
  }),
  maxYear: z.number({
    required_error: 'Please select the oldest production year.',
  }),
  badges: z.string(),
  bodyType: z.string(),
  bodyTypeConfig: z.string(),
  fuelType: z.string(),
  transmission: z.string(),
  engine: z.string(),
  cylinders: z.string(),
  division: z.string(),
  drive: z.string(),
  seat: z.string(),
  doors: z.string(),
  minOdometer: z.number(),
  maxOdometer: z.number(),
  state: z.string(),
  saleCategory: z.string(),
  minSoldDate: z.date(),
  maxSoldDate: z.date(),
  sort: z.string(),
  orderBy: z.string(),
  search: z.string(),
})

const Index = () => {
  const [makeSelectItems, setMakeSelectItems] = useState([
    'Make',
    'Audi',
    'BMW',
    'Volvo',
  ])
  const [familySelectItems, setFamilySelectItems] = useState([
    'Family',
    'A1',
    'A3',
    'A5',
  ])
  const [badgesSelectItems, setBadgesSelectItems] = useState([
    'Badges',
    'Spider',
  ])
  const [initMinYear, setInitMinYear] = useState(2008)
  const [initMaxYear, setInitMaxYear] = useState(2022)
  const [minYear, setMinYear] = useState(2008)
  const [maxYear, setMaxYear] = useState(2022)
  const [bodyTypeSelectItems, setBodyTypeSelectItems] = useState([
    'Body Type',
    'Roadster',
  ])
  const [bodyTypeConfigSelectItems, setBodyTypeConfigSelectItems] = useState([
    'Body Type Config',
    '(Blank)',
  ])
  const [fuelTypeSelectItems, setFuelTypeSelectItems] = useState([
    'Fuel Type',
    'Petrol',
  ])
  const [transmissionSelectItems, setTransmissionSelectItems] = useState([
    'Transmission',
    'Automatic',
  ])
  const [engineSelectItems, setEngineSelectItems] = useState(['Engine', '1.4'])
  const [cylindersSelectItems, setCylindersSelectItems] = useState([
    'Cylinders',
    '4',
  ])
  const [divisionSelectItems, setDivisionSelectItems] = useState([
    'Division',
    'Motor Vehicles',
  ])
  const [driveSelectItems, setDriveSelectItems] = useState([
    'Drive',
    'Rear Wheel Drive',
  ])
  const [seatSelectItems, setSeatSelectItems] = useState(['Seat', '2'])
  const [doorsSelectItems, setDoorsSelectItems] = useState(['Doors', '2'])
  const [initMinOdometer, setInitMinOdometer] = useState(29178)
  const [initMaxOdometer, setInitMaxOdometer] = useState(39178)
  const [minOdometer, setMinOdometer] = useState(29178)
  const [maxOdometer, setMaxOdometer] = useState(39178)
  const [statesSelectItems, setStatesSelectItems] = useState([
    'States',
    'ACT',
    'NSW',
    'NT',
    'QLD',
    'SA',
    'TAS',
    'VIC',
    'WA',
  ])
  const [saleCategorySelectItems, setSaleCategorySelectItems] = useState([
    'Sale Category',
    'Auction',
    'Dealership',
    'Fixed Price',
    'Wholesale',
  ])
  const [minSoldDate, setMinSoldDate] = useState(sub(new Date(), { days: 7 }))
  const [maxSoldDate, setMaxSoldDate] = useState(new Date())
  const [sortSelectItems, setSortSelectItems] = useState([
    'Sort',
    'Sold Date',
    'Age',
    'Odometer',
  ])
  const [orderBySelectItems, setOrderBySelectItems] = useState([
    'Order By',
    'Asc',
    'Desc',
  ])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <>
      {/* Filter Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mb-[15px]"
        >
          <div className="flex flex-wrap items-center">
            {/* Make */}
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px]  bg-white">
                  <Select onValueChange={field.onChange} defaultValue="Audi">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Make" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Family */}
            <FormField
              control={form.control}
              name="family"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select onValueChange={field.onChange} defaultValue="A5">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Family" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year */}
            <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={`${minYear} | ${maxYear}`} />
                </SelectTrigger>
                <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[230px]">
                  <div className="flex justify-between gap-2">
                    <FormField
                      control={form.control}
                      name="minYear"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormControl>
                            <Input
                              placeholder={minYear.toString()}
                              className="py-1 px-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxYear"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormControl>
                            <Input
                              placeholder={maxYear.toString()}
                              className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Slider
                    defaultValue={[minYear, maxYear]}
                    min={initMinYear}
                    max={initMaxYear}
                    step={1}
                    onValueChange={(values) => {
                      setMinYear(values[0])
                      setMaxYear(values[1])
                    }}
                    className="mt-2"
                  />
                </SelectContent>
              </Select>
            </div>

            {/* Badges */}
            <FormField
              control={form.control}
              name="badges"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Badges" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body type */}
            <FormField
              control={form.control}
              name="bodyType"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Body Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Body Type Config */}
            <FormField
              control={form.control}
              name="bodyTypeConfig"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Body Type Config" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fuel Type */}
            <FormField
              control={form.control}
              name="fuelType"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Fuel Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Transmission */}
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Transmission" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Engine */}
            <FormField
              control={form.control}
              name="engine"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Engine" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cylinders */}
            <FormField
              control={form.control}
              name="cylinders"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Cylinders" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Division */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Drive */}
            <FormField
              control={form.control}
              name="drive"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Drive" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seat */}
            <FormField
              control={form.control}
              name="seat"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Doors */}
            <FormField
              control={form.control}
              name="doors"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Doors" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Odometer */}
            <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Odometer" />
                </SelectTrigger>
                <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[230px]">
                  <div className="flex justify-between gap-1">
                    <FormField
                      control={form.control}
                      name="minOdometer"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormControl>
                            <Input
                              placeholder={minOdometer.toString()}
                              className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxOdometer"
                      render={({ field }) => (
                        <FormItem className="py-2">
                          <FormControl>
                            <Input
                              placeholder={maxOdometer.toString()}
                              className="p-[10px] text-[13px] border-[#adb5bd] rounded-[4px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Slider
                    defaultValue={[minOdometer, maxOdometer]}
                    min={initMinOdometer}
                    max={initMaxOdometer}
                    step={1}
                    onValueChange={(values) => {
                      setMinOdometer(values[0])
                      setMaxOdometer(values[1])
                    }}
                  />
                </SelectContent>
              </Select>
            </div>

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="States" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sale Category */}
            <FormField
              control={form.control}
              name="saleCategory"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sale Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sale Date */}
            <div className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sale Date" />
                </SelectTrigger>
                <SelectContent className="bg-white p-[10px] shadow-[0_0_15px_rgba(0,0,0,0.20)] w-[170px]">
                  <FormField
                    control={form.control}
                    name="minSoldDate"
                    defaultValue={minSoldDate}
                    render={({ field }) => (
                      <>
                        <RadioGroup
                          defaultValue="7"
                          onValueChange={(value) => {
                            if (value === '7') {
                              field.onChange(sub(new Date(), { days: 7 }))
                            } else if (value === '30') {
                              field.onChange(sub(new Date(), { days: 30 }))
                            } else if (value === '90') {
                              field.onChange(sub(new Date(), { days: 90 }))
                            }
                          }}
                          className="mb-4"
                        >
                          <div className="flex items-center space-x-2 text-[13px]">
                            <RadioGroupItem value="7" id="r1" />
                            <Label htmlFor="r1">Last 7 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="r2" />
                            <Label htmlFor="r2">Last 30 days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="90" id="r3" />
                            <Label htmlFor="r3">Last 90 days</Label>
                          </div>
                        </RadioGroup>

                        <FormItem className="flex flex-col">
                          <FormLabel className="text-[13px]">Min</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[150px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'dd/MM/yyyy')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0 bg-white"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(value) => {
                                  field.onChange(value)
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
                        </FormItem>
                      </>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxSoldDate"
                    defaultValue={maxSoldDate}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-[13px]">Max</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[150px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd/MM/yyyy')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(value) => {
                                field.onChange(value)
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
                      </FormItem>
                    )}
                  />
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort | Sold Date" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order By */}
            <FormField
              control={form.control}
              name="orderBy"
              render={({ field }) => (
                <FormItem className="w-[13.5%] mt-[10px] mr-[6px] h-[38px] bg-white">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Order By | Asc" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-wrap items-center">
            {/* Search */}
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="mt-[11px] mr-[10px] w-[42.3%]">
                  <FormControl>
                    <Input
                      className="my-1 border-[#adb5bd] rounded-[4px] placeholder:text-[#aaa]"
                      placeholder="e.g. Metallic Paint,Power front seats,Power Sunroof, ..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Button Group */}
            <div className="mt-2">
              <Button
                type="submit"
                className="bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
              >
                Apply Filter
              </Button>
              <Button
                type="reset"
                className="ml-4 bg-[#00a0df] hover:bg-[#0085b9] hover:border-[#0085b9] border font-normal px-3 py-[0.375rem] text-[1rem] leading-6 border-[#00a0df] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
              >
                Clear Filter
              </Button>
              <Button
                onClick={() =>
                  (window.location.href =
                    'https://pricespeoplepay.com.au/pricing?make=ABAR&model=124')
                }
                className="ml-4 bg-[#ff5a60] hover:bg-[#ff5a60] hover:border-[#ff5a60] border font-semibold px-3 py-[0.375rem] text-[1rem] leading-6 border-[#ff5a60] text-white rounded-[0.2rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)]"
              >
                Subscribe to Generate Summary Report
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {/* Vehicle Stats */}
      <VehicleStats></VehicleStats>

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

      {/* List View */}
      <ListView></ListView>

      {/* Grid View */}
      <GridView></GridView>

      <div className="flex justify-center p-6">
        <Button className="px-[1.8rem] py-[0.8rem] rounded-[0.2rem] text-base text-white bg-[#00a0df] border border-[#00a0df] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_1px_1px_rgba(0,0,0,0.075)] font-normal hover:bg-[#0085b9] hover:border-[#0085b9]">
          Load More
        </Button>
      </div>
    </>
  )
}

export default Index
