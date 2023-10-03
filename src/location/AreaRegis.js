import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from 'shortid';
import database from "../Firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Load_StateData } from '../redux/action';
import { Load_CityData } from '../redux/action';
import { Load_AreaData } from '../redux/action';
import AreaReport from '../Report/AreaReport';
import Dashboard from '../component/Dashboard';


let cityDataArray=[];

const initData = {
  state_name: "",
  stateid: "",
  city_name: "",
  cityid: "",
  area_name:"",
  areaid:"",
  area_pin:""
}

const AreaRegis = () => {
const [state, setState] = useState(initData);
const [register,setRegister] = useState(false);
const [update,setUpdate] = useState(false);

const {id}=useParams();
let matchid=id;

console.log("match--------",matchid);

const { Loadstate } = useSelector(state => state.cartreducer);
const { Loadcity } = useSelector(state => state.cartreducer);
const { Loadarea } = useSelector(state => state.cartreducer);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(Load_StateData());
  dispatch(Load_CityData());
   
  dispatch(Load_AreaData());
  Object.keys(Loadarea).map((id,index)=>{
       if(matchid===id)
       {
          setState({...Loadarea[id]})
       }
  })
}, [id]);

// =================data submit on database=============
const stateid1 = shortid.generate();
const cityid1 = shortid.generate();
const areaid1 = shortid.generate();

const handleChange = (e) => {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
}

cityDataArray=[];
      Object.keys(Loadcity).map((id,index)=>{
     if(state.state_name===Loadcity[id].state_name)
    {
      cityDataArray.push(Loadcity[id].city_name)
    }
  })

   //============== id call=======================
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

  const handleSubmit = (e) => {

    
    if(id) {
     
      state.areaid=areaid;
      loadupdateData()
  }
  else{
      const areaid1= shortid.generate();
      state.areaid=areaid1;

      dataInsert()
  }
    e.preventDefault();
}
 
    const dataInsert = () => {
    database.ref("area_table").push(state, (err) => {
      if (err) {
        alert("data not insert")
      }
      else {
        alert("data inserted")
        setRegister(true);
      }
    })

    }
  
  
  const updateData = () => {
    database.ref(`area_table/${id}`).set(state, (err) => {
        if (err) {
            alert("area not update");
        }
        else {
            alert("area updated");
            setUpdate(true);
        }
    })
}
let myfordata = "";
    const loadupdateData = () => {
      state.areaid = areaid;
        if (myfordata !== null) {

            updateData();

}
}
const {state_name,stateid}=state;
const {city_name,cityid} =state;
const {area_name,areaid} =state;

  return (
    <>
    {
      register?<><Dashboard/></>:
      update?<><AreaReport/></>:
   <>
   <Dashboard/>
   <div className="container" style={{ marginTop: "170px" }}>
        <form
          onSubmit={handleSubmit}
          className="container border border-danger col-sm-offset-2 col-sm-4  mt-4"
          style={{ backgroundColor: '#0B0B45',borderRadius:"10px"}}
        >
          <h3 className="text-center text-danger">Area Registration</h3>
    
         
          <div className="container mb-3">
            <select className="form-control mb-3" name="state_name" onChange={handleChange} 
            value={state_name ||""}>
              <option> Select State Name</option>
              {
                Object.keys(Loadstate).map((id, index) => {
                  return (
                    <option>{Loadstate[id].state_name}</option>
                  )


                })
              }
            </select>

          </div>
          <div className="container mb-3">
            <select className="form-control mb-3" name="city_name" onChange={handleChange} 
            value={city_name ||""}>
              <option selected> Select City Name</option>
              {
                Object.keys(cityDataArray).map((id, index) => {
                  return (
                    <option>{cityDataArray[id]}</option>
                  )
                })
              }
            </select>

          </div>

            <div className="container mb-3">
            <input
              type="text"
              name="area_name"
              className="form-control  mb-3"
              onChange={handleChange}
              value={area_name ||""}
              placeholder="Enter the area name"
            />
          </div>
          <div className="container mb-4 text-danger">
                        <label> Area Pincode</label>
                        <input
                            type="pin"
                            name="area_pin"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>


          <div className="container text-center">
            <button
              type="submit"
              className="btn btn-warning text mb-4">
             {id?"update":"register"}
            </button>
          </div>
        </form>
      </div>
   
   </>
}</>
  )
}

export default AreaRegis;