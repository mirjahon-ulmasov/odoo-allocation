import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationList from "./components/NotificationList";
import { fetchDealers } from "store/sales_manager";
import ReportEdit from "./components/ReportEdit";
import Report from "./components/Report";

export default function SalesManager() {
  const [dealer, setDealer] = useState("");

  const dispatch = useDispatch();
  const { dealers, sm_prods, loading } = useSelector(
    (state) => state.sales_manager
  );

  useEffect(() => {
    dispatch(fetchDealers());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={
          <Report
            sm_prods={sm_prods}
            loading={loading}
            dealers={dealers}
            dealer={dealer}
            onSetDealer={(dealer) => setDealer(dealer)}/>} />
      <Route path="/edit" element={
          <ReportEdit 
            sm_prods={sm_prods} 
            loading={loading}  
            dealers={dealers} 
            dealer={dealer}
            onSetDealer={(dealer) => setDealer(dealer)}/>} />
      <Route path="/notifications" element={<NotificationList />} />
    </Routes>
  );
}
