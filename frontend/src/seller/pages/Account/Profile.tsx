import React, { useEffect, useState } from "react";
import {Avatar, Box, Button, Divider, Modal,} from "@mui/material";
import ProfileFieldCard from "./ProfileFieldCard";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";
import { useAppSelector } from "../../../State/Store";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("personalDetails");
  const handleClose = () => setOpen(false);
  const { sellers } = useAppSelector((store) => store);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;
      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="lg:p-20 space-y-20">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl text-black">Personal Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              size="small"
              sx={{ color: "black" }}
              className="w-10 h-10"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
            src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
          />
          <div>
            <ProfileFieldCard
              keys={"Seller Name"}
              value={sellers.profile?.name || "Not Provided"}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Seller Email"}
              value={sellers.profile?.email || "Not Provided"}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Seller Mobile"}
              value={sellers.profile?.mobile || "Not Provided"}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl text-black ">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
              size="small"
              sx={{ color: "black" }}
              className="w-10 h-10"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFieldCard
              keys={"Address"}
              value={sellers.profile?.pickupAddress?.address}
            />
            <Divider />
            <ProfileFieldCard
              keys={"City"}
              value={sellers.profile?.pickupAddress?.city || "Not Provided"}
            />
            <Divider />
            <ProfileFieldCard
              keys={"State"}
              value={sellers.profile?.pickupAddress?.state}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Mobile"}
              value={sellers.profile?.pickupAddress?.mobile}
            />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl text-black ">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
              size="small"
              sx={{ color: "black" }}
              className="w-10 h-10"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFieldCard
              keys={"Account Holder Name"}
              value={sellers.profile?.bankDetails?.accountHolderName}
            />
            <Divider />
            <ProfileFieldCard
              keys={"Account Number"}
              value={sellers.profile?.bankDetails?.accountNumber || "Not Provided"}
            />
            <Divider />
            <ProfileFieldCard
              keys={"IBAN"}
              value={sellers.profile?.bankDetails?.ifscCode}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
    </div>
  );
};

export default Profile;
