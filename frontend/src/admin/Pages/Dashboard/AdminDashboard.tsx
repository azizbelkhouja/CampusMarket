import React, { useEffect, useState } from 'react'
import AdminDrawerList from '../../components/AdminDrawerList'
import AdminRoutes from '../../../Routes/AdminRoutes';
import { useAppSelector } from '../../../State/Store';
import { Alert, Snackbar } from '@mui/material';

const AdminDashboard = () => {

  const { deal,admin } = useAppSelector(store => store)
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }
  useEffect(() => {
    if (deal.dealCreated || deal.dealUpdated ||deal.error || admin.categoryUpdated) {
      setOpenSnackbar(true)
    }
  }, [deal.dealCreated, deal.dealUpdated, deal.error,admin.categoryUpdated])

  return (
    <>
      <div className="lg:flex lg:h-[90vh]">
        <section className="lg:flex lg:h-[90vh]">
          <div className="hidden lg:block h-full">
            <AdminDrawerList />
          </div>
          <div className="p-10 w-full lg:w-[80%] overflow-y-auto">
            <AdminRoutes />
          </div>
        </section>
      </div>

      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbarOpen} autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
        <Alert
          onClose={handleCloseSnackbar}
          severity={deal.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {deal.error ? deal.error : deal.dealCreated ? "Deal created successfully" : deal.dealUpdated ? "Deal updated successfully" : admin.categoryUpdated?"Category Updated successfully": ""}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AdminDashboard