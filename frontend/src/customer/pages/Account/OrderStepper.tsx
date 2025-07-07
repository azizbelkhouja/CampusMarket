import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


const steps = [
    { name: "Order Placed", description: "on Sun, 15 Jun", value: "PLACED" },
    { name: "Packed", description: "Item Packed in Warehouse", value: "CONFIRMED" },
    { name: "Shipped", description: "by Wed, 18 Jun", value: "SHIPPED" },
    { name: "Arriving", description: "by 01 Jul - 03 Jul", value: "ARRIVING" },
    { name: "Arrived", description: "NaN", value: "DELIVERED" }
];
  
  const canceledStep = [
    { name: "Order Placed", description: "on Sun, 15 Jun", value: "PLACED" },
    { name: "Order Canceled", description: "on Sun, 15 Jun", value: "CANCELLED" },
];
  
  const currentStep = 2;
  

export const OrderStepper = ({orderStatus}: any) => {

    const [statusStep, setStatusStep] = useState(steps);

    useEffect(() => {
    if (orderStatus === 'CANCELLED') {
        setStatusStep(canceledStep);
    } else {
        setStatusStep(steps);
    }
    }, [orderStatus]);

  return (
    <Box className="my-10">
        {statusStep.map((step, index) => (
            <div key={index} className="flex px-4">
                <div className="flex flex-col items-center">
                    <Box
                        sx={{ zIndex: -1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                            index <= currentStep
                            ? "bg-[#bdc7db] text-[#213D72]"
                            : "bg-gray-200 text-gray-400"
                        }`}
                    >
                        {step.value === orderStatus ? (
                            <CheckCircleIcon />
                        ) : (
                            <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                        )}
                    </Box>
                    {index < statusStep.length - 1 && (
                        <div
                            className={`h-20 w-[2px] ${
                            index < currentStep
                                ? "bg-[#213D72]"
                                : "bg-gray-300 text-gray-600"
                            }`}
                        ></div>
                    )}
                </div>

                <div className={`ml-2 w-full`}>
                    <div
                        className={`${
                        step.value === orderStatus
                            ? "bg-black p-2 text-white font-medium rounded-md -translate-y-3"
                            : ""
                        } ${
                        orderStatus === "CANCELLED" && step.value === orderStatus
                            ? "bg-red-500"
                            : ""
                        } w-full`}
                    >
                        <p className={` `}>
                            {step.name}
                        </p>
                        <p
                            className={`${
                                step.value === orderStatus ? "text-gray-200" : "text-[#00B1D3]"
                            } text-xs`}
                            >
                            {step.description}
                        </p>

                    </div>
                </div>
            </div>
        ))}
    </Box>

  )
}
