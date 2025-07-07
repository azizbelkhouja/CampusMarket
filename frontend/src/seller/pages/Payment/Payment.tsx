import { Button, Card, Divider } from '@mui/material'
import React, { useState } from 'react'
import TransactionTable from './Transaction'
import Payouts from './PayoutsTable';
import { useAppSelector } from '../../../State/Store';

const tab = [
    { name: "Transaction" },
]

const Payment = () => {

  const [activeTab, setActiveTab] = useState(tab[0].name);
  const { sellers } = useAppSelector((store) => store);

  const handleActiveTab = (item:any) => {
    setActiveTab(item.name);
}

  return (
    <div className='space-y-5'>
        <Card className='rounded-md space-y-4 p-5'>
            <h1 className="text-gray-600 font-medium">Total Earnings</h1>
            <h1 className="font-bold text-xl pb-1">{sellers.report?.totalEarnings}€</h1>
            <Divider/>
            <p className="text-gray-600 font-medium pt-1">Last Payment: <strong>0€</strong></p>
        </Card>
        
        <div className='flex gap-4'>
            {tab.map((item) => <Button onClick={()=>handleActiveTab(item)} className='my-main-button-outlined'>{item.name}</Button>)}
        </div>
        <div className='mt-5'>
            {activeTab === "Transaction"? <TransactionTable /> : <Payouts />}
        </div>
    </div>
  )
}

export default Payment;