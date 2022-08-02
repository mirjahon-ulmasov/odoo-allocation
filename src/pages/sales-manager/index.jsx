import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationList from "./components/NotificationList";
import { fetchDealers, fetchSmProds } from "store/sales_manager";
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

  useEffect(() => {
    if (!dealers) return;
    let dealerId = dealer ? dealer : dealers[0].id;
    dispatch(fetchSmProds({ dealer: dealerId }));
  }, [dispatch, dealers, dealer]);

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
