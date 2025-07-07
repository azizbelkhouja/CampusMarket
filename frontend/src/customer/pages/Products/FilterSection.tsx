import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../../data/Filter/color'
import { price } from '../../../data/Filter/price';
import { discount } from '../../../data/Filter/discount';
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {

  const [expendColor, setExpendColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleExpendColor = () => {
    setExpendColor(!expendColor)
  }

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    console.log("clearAllFilters", searchParams);
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className='space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className="text-lg font-semibold">Filters</p>
        <Button onClick={clearAllFilters} size='small' className='cursor-pointer my-main-button-outlined' >Clear All</Button>
      </div>
      <Divider/>
      <div className='p-9 space-y-6'>
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                pb: '14px'
              }}
              className='text-2xl font-semibold' id='color'>Color
            
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilterParams}
            >
              {colors.slice(0, expendColor?colors.length:5).map((item) => <FormControlLabel value={item.name} control={<Radio />} label={
                <div className='flex items-center gap-3'>
                  <p 
                    style={{backgroundColor: item.hex}}
                    className={`h-5 w-5 ${item.name === "White"?"border":""}`}
                    >
                  </p>
                  <p>{item.name}</p>
                </div>
              } />)}
              
            </RadioGroup>
          </FormControl>
          <div>
            <button
              onClick={handleExpendColor}
              className='text-gray-400 cursor-pointer hover:text-gray-700 flex items-center'>
              {expendColor ? 'Show Less' : `+${colors.length - 5} more`}
            </button>
          </div>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                pb: '14px'
              }}
              className='text-2xl font-semibold' id='price'>Price
            </FormLabel>
            <RadioGroup
              name="price"
              aria-labelledby="price"
              defaultValue=""
              onChange={updateFilterParams}
            >
              {price.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>

          </FormControl>
        </section>

        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                pb: '14px'
              }}
              className='text-2xl font-semibold' id='discount'>Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              aria-labelledby="brand"
              defaultValue=""
              onChange={updateFilterParams}
            >
              {discount.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  )
}

export default FilterSection