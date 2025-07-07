import { Button } from '@mui/material';
import React, { useState } from 'react'
import DealTable from './DealTable';
import CreateDealForm from './CreateDealForm';
import DealCategoryTable from './DealCategoryTable';

const tab = [
  { name: "Deals" },
  { name: "Categories" },
  { name: "Create Deal" }
]
const Deal = () => {

  const [activeTab, setActiveTab] = useState(tab[0].name);

  const handleActiveTab = (item: any) => {
      setActiveTab(item.name);
  }
  return (
      <div>
          <div className=''>
            <div className='flex gap-4'>
                {tab.map((item) => <Button sx={{ backgroundColor: "white", color: "black", border: "black", borderRadius: "0" }} onClick={() => handleActiveTab(item)} variant={activeTab === item.name ? "contained" : "outlined"}>{item.name}</Button>)}
            </div>
            <div className='mt-5'>
                {activeTab === "Deals" ? <DealTable /> : activeTab==="Categories"? <DealCategoryTable />:<div className='mt-5 border-t h-[70vh]'>
                <CreateDealForm/></div>}
            </div>
          </div>
      </div>
  )
}

export default Deal