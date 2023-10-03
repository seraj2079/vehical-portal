import React from "react";
import {Route,Routes} from 'react-router-dom';
import SignIn from "../login/SignIn";
import MemberRegis from "../component/MemberRegis";
import MemberLogin from "../login/MemberLogin";
import Registration from "../component/Registration";
import MemberDash from "../component/MemberDash";
import RegisReport from "../Report/RegisReport";
import Product from "../component/Product";
import ProductReport from "../Report/ProductReport";
import Dashboard from "../component/Dashboard";
import OwnerDash from "../component/OwnerDash";
import StateRegis from "../location/StateRegis";
import CityRegis from "../location/CityRegis";
import AreaRegis from "../location/AreaRegis";
import StateReport from "../Report/StateReport";
import CityReport from "../Report/CityReport";
import AreaReport from "../Report/AreaReport";
import ShowroomReport from "../Report/ShowroomReport";
import Showroom from "../component/Showroom";
import MemberReport from "../Report/MemberReport";
import Dashboard_admin from "../component/Dashboard_admin";
import Home from "./Home";

const MyMap  = () =>{
  return(
    <>
    <Routes>
    <Route path="/" element={<SignIn/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/member_login" element={<MemberLogin/>}/>
    <Route path='/member_regis' element={<MemberRegis/>}/>
    <Route path='/member_dash' element={<MemberDash/>}/>
    <Route path='/register' element={<Registration/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/ownerdash' element={<OwnerDash/>}/>
    <Route path='/regisreport' element={<RegisReport/>}/>
    <Route path='/product' element={<Product/>}/>
    <Route path='/state_regis' element={<StateRegis/>}/>
    <Route path='/city_regis' element={<CityRegis/>}/>
    <Route path='/area_regis' element={<AreaRegis/>}/>
    <Route path='/state_report' element={<StateReport/>}/>
    <Route path='/city_report' element={<CityReport/>}/>
    <Route path='/area_report' element={<AreaReport/>}/>
    <Route path='/showroom_report' element={<ShowroomReport/>}/>
    <Route path='/product_report' element={<ProductReport/>}/>
    <Route path='/showroom' element={<Showroom/>}/>
    <Route path='/member_report' element={<MemberReport/>}/>
    <Route path="/dashboard_admin" element={<Dashboard_admin/>}/>
    <Route path="/register" element={<CityRegis/>}/>
    <Route path="/register" element={<AreaRegis/>}/>
    <Route path="/register" element={<Dashboard_admin/>}/>
    <Route path="/edit_StateReport/:id" element={<StateRegis/>}/>
    <Route path="/edit_CityReport/:id" element={<CityRegis/>}/>
    <Route path="/edit_AreaReport/:id" element={<AreaRegis/>}/>
    <Route path="/edit_MemberReport/:id" element={<MemberRegis/>}/>
    <Route path="/edit_ShowroomReport/:id" element={<Showroom/>}/>
    <Route path="/edit_ProductReport/:id" element={<Product/>}/>
    <Route path="/edit_RegisReport/:id" element={<Registration/>}/>
    
    </Routes>
  
    </>
  );
}
export default MyMap;