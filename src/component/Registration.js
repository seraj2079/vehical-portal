import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Load_StateData,Load_AreaData,Load_CityData, Load_MemberData  } from '../redux/action';
import {  Load_ShowData } from '../redux/action';
import database from "../Firebase";
import shortid from 'shortid';
import Resizer from 'react-image-file-resizer';
import { useParams } from "react-router-dom";
import Dashboard from './Dashboard';
import MemberDash from './MemberDash';

const initData = {
    mob_number:"",
    showroom_name: "",
    showroomid: "",
    shop_name:"",
    shopid:"",
    state_name: "",
    stateid:"",
    city_name: "",
    cityid:"",
    area_name: "",
    areaid:"",
    shop_address: "",
    area_pin: "",
    password:"",
    registeredby:""    
}
const initImgData ={
    shopid: "",
    shop_img:""
    
}
let myfordata ="";

let cityDataArray = [];
let areaDataArray = [];

const Registration = () => {

    const [state, setState] = useState(initData);
    const [userimg, setUserImg] = useState(initImgData);
    const [register,setRegister]=useState(false);
    const [update,setUpdate] = useState(false);

const {id}=useParams();
let matchid=id;

// let loadDataArray=[];
// {
//     Object.keys(Loadregis).map((id1,index1)=>{
//         Object.keys(Loadregis[id1]).map((id2,index2)=>{
//             loadDataArray.push(Loadregis[id1][id2]);
//         })
//     })
// }
  
const {LoadMember_Detail} =useSelector(state=>state.cartreducer);
const { Loadstate } = useSelector(state => state.cartreducer);
const { Loadcity } = useSelector(state => state.cartreducer);
const { Loadarea } = useSelector(state => state.cartreducer);
const {Loadtypeshow } = useSelector(state => state.cartreducer);
const { Loadregis } = useSelector(state => state.cartreducer);
const { Loadregisimg } = useSelector(state => state.cartreducer);
const {Loadmember} = useSelector(state => state.cartreducer);

// console.log('Loadmember---------------', Loadmember)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(Load_StateData());
    dispatch(Load_CityData());
    dispatch(Load_AreaData());
    dispatch(Load_ShowData());
    dispatch(Load_MemberData());    
},[]);


useEffect(()=>{
setState({...Loadregis[matchid]});
if(matchid){
    Object.keys(Loadregisimg[Loadregis[matchid].mob_number]).map((id,index)=>{        
        global.imgid=id;
        setUserImg({...(Loadregisimg[Loadregis[matchid].mob_number])[id]});
 })
  setUserImg({...Loadregisimg[Loadregis[matchid].mob_number]});
}

},[matchid]);


    const handlechange = (e) => {
        const { name, value } = e.target;
        setState({ ... state, [name]: value });
    }

    const handleSubmit = (e) => {

        const idData = shortid.generate();
        state.shopid = idData;
        userimg.shopid = idData;
        state.password=idData; 
        state.stateid=stateid;
        state.cityid=cityid;
        state.areaid=areaid;


        if(id) {
            loadupdateData()
        }
        else{
            dataInsert()
        }
    e.preventDefault();
    }

    let stnm=state.state_name;
    let ctnm=state.city_name;
    let arnm=state.area_name;
    let mob=state.mob_number;        
    
        const updateData = () => {
            database.ref(`user_reg/${stnm}/${ctnm}/${arnm}/${id}`).set(state, (err) => {
                if (err) {
                    alert("registration not update");
                }
                else {
                    database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob}/${global.imgid}`).set(userimg);
                    alert("registration updated");
                  
                }
            });
        }
        console.log("state================",state,"====",LoadMember_Detail.member_name); 
        const dataInsert = () => { 
            console.log("state======loaddddd==========",state); 
        state.registeredby =LoadMember_Detail.member_name;
        database.ref(`user_reg/${stnm}/${ctnm}/${arnm}`).push(state, (err) => {
                if (err) {
                    alert("Registration Unsucessfull");
                }
                else {
                    database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob}`).push(userimg);
                    alert("Registration Sucessfull "+state.password);
                    setState({...initData});
                    setUserImg({...initImgData});

                }
            
            });
      }
      
      const loadupdateData=()=>{
        state.shopid=shopid;
        userimg.shopid = shopid;
        if(myfordata !==null){
            updateData();
        }
        else{
            userimg.shop_img=shop_img;
            updateData();
        }
    }
        const {state_name,stateid}=state;
        const {city_name,cityid} =state;
        const {area_name,areaid} =state;
        const {shop_name,shopid}=state;
        const {showroom_name,showroomid} =state;
        const {shop_address,area_pin,mob_number} =state;
        const {shop_img} =userimg;
 
    
    cityDataArray = [];
    Object.keys(Loadcity).map((id, index) => {
        if (state.state_name === Loadcity[id].state_name) {
            cityDataArray.push(Loadcity[id].city_name)
        }
    })

    areaDataArray = [];
    Object.keys(Loadarea).map((id, index) => {
        if (state.city_name === Loadarea[id].city_name) {
            areaDataArray.push(Loadarea[id].area_name)
        }
    })
    

// ---------id gen-------

    if(state.state_name){
        Object.keys(Loadstate).map((id,index)=>{
          if(state.state_name===Loadstate[id].state_name){
            state.stateid=Loadstate[id].stateid;
          }
        })
      }
     
    
      if(state.city_name){
        Object.keys(Loadcity).map((id,index)=>{
          if(state.city_name===Loadcity[id].city_name){
            state.cityid=Loadcity[id].cityid;
          }
        })
      }
    
      if(state.area_name){
        Object.keys(Loadarea).map((id,index)=>{
          if(state.area_name===Loadarea[id].area_name){
            state.areaid=Loadarea[id].areaid;
          }
        })
      }
    
      if(state.showroom_name){
        Object.keys( Loadtypeshow).map((id,index)=>{
          if(state.showroom_name=== Loadtypeshow[id].showroom_name){
            state.showroomid= Loadtypeshow[id].showroomid;
          }
        })
      }
    

    const imageLoad = (e) => {

        var fileInput = false;
        if (e.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    e.target.files[0],
                    300,
                    300,
                    "JPEG",
                    200,
                    0,
                    (uri) => {
                        myfordata = uri;
                        userimg.shop_img = uri;
                    },
                    "base64",
                    300,
                    300
                );
            }
            catch (err) {
                console.log("error in image section");
            }
        }


    }
    return (
        <> 
        <div>
            {
                global.registered_contact==="07648278827" ?  <Dashboard/>:<MemberDash/>
            }
        </div>
            <div className="container" style={{ marginTop: "150px" }}>
                <form onSubmit={handleSubmit} className="container border border-danger
            col-sm-offset-2 col-sm-3 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>

                    <h3 className="text-center text-danger ">
                        Registration
                    </h3>

                    <div className="container mb-4 text-danger">
                        <label>Mobile Number</label>
                        <input
                            type="number"
                            name="mob_number"
                            value={mob_number ||""}
                            className="form-control"
                            placeholder="Enter Number"
                            onChange={handlechange}
                        />
                    </div>
                    <div className="container mb-4 text-danger">
                        <label>Shop name</label>
                        <input
                            type="text"
                            name="shop_name"
                            value={shop_name ||""}
                            className="form-control"
                            placeholder="Enter Name"
                            onChange={handlechange}
                        />
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>Shop logo</label>
                        <input
                            type="file"
                            name="shop_img"
                            className="form-control"
                            placeholder="Select image"
                            onChange={imageLoad}
                        />
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>showroom Type</label>
                        <select className="form-control" onChange={handlechange} name="showroom_name"
                        value={showroom_name ||""}>
                            <option>Select showroom Type </option>
                            {
                                Object.keys(Loadtypeshow).map((id,index) =>{
                                    return(
                                        <option> {Loadtypeshow[id].showroom_name}</option>
                                        
                                    )
                                }
                                )
                            }
                        </select>
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>State Name</label>
                        <select onChange={handlechange} className="form-control" name="state_name"
                        value={state_name ||""}>
                            <option>Select State Name</option>
                            {
                                Object.keys(Loadstate).map((id, index) => {
                                    return (
                                        <option>{Loadstate[id].state_name}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>City Name</label>
                        <select onChange={handlechange} className="form-control mb-4" name="city_name"
                        value={city_name ||""}>
                            <option selected>Select City Name</option>
                            {
                                Object.keys(cityDataArray).map((id, index) => {
                                    return (
                                        <option>{cityDataArray[id]}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>area Name</label>
                        <select onChange={handlechange} className="form-control mb-4" name="area_name"
                        value={area_name ||""}>
                            <option selected>Select Area Name</option>
                            {
                                Object.keys(areaDataArray).map((id, index) => {
                                    return (
                                        <option>{areaDataArray[id]}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                   
                    <div className="container mb-4 text-danger">
                        <label>Shop Address</label>
                        <input
                            type="text"
                            name="shop_address"
                            value={shop_address ||""}
                            className="form-control"
                            placeholder="Enter Address"
                            onChange={handlechange}
                        />
                    </div>

                    <div className="container mb-4 text-danger">
                        <label>shop Area Pincode</label>
                        <input
                            type="pin"
                            name="area_pin"
                            value={area_pin ||""}
                            className="form-control"
                            onChange={handlechange}
                        />
                    </div>

                    <div className="container text-center mb-4">
                        <Button
                            type="submit"
                            className="btn btn-success text ">
                             {id?"update":"register"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Registration;











