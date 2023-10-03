// import { Button } from "react-bootstrap"; 
import React,{useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from "../Firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Load_StateData } from '../redux/action';
import { Load_CityData } from '../redux/action';
import AreaRegis from "./AreaRegis";
import Dashboard from "../component/Dashboard";

const initialData={
    state_name:"",
    stateid:"",
    city_name:"",
    cityid:""
 }

 const   CityRegis = () => {
const [state,setState] =useState(initialData);
const [register,setRegister] = useState(false);
const [update,setUpdate] = useState(false);

const {id}=useParams();
let matchid=id;

console.log("match--------",matchid);

const { Loadstate } = useSelector(state => state.cartreducer);
const { Loadcity } = useSelector(state => state.cartreducer);
const dispatch = useDispatch();
  
useEffect(() => {
    dispatch(Load_StateData());

    dispatch(Load_CityData());
    Object.keys(Loadcity).map((id,index)=>{
         if(matchid===id)
         {
            setState({...Loadcity[id]})
         }
    })
}, [id]);

// =================data submit on database=============

const stateid1 = shortid.generate();
const cityid1 = shortid.generate();


const handleChange =(e)=>{
    const {name,value}=e.target;
    setState({...state,[name]:value});

}
//==============state id call============================

if(state.state_name)
{
    Object.keys(Loadstate).map((id,index)=>{
     if(state.state_name === Loadstate[id].state_name)
     {
        state.stateid=Loadstate[id].stateid;
     }
    })
}
    const handleSubmit =(e)=>{

        if(id) {
            state.cityid=cityid ;
            loadupdateData()
        }
        else{
            const cityid1= shortid.generate();
            state.cityid=cityid1;
           
            dataInsert()
        }

e.preventDefault();
 }

// console.log("state---------------",state);

const dataInsert = () => {
database.ref("city_table").push(state,(err)=>{
    if(err) {
        alert("City is not register");
    }
    else{
        alert("City is register");
        setRegister(true);
    }

})   
}

  
  const updateData = () => {
    database.ref(`city_table/${id}`).set(state, (err) => {
        if (err) {
            alert("city not update");
        }
        else {
            alert("city updated");
            setUpdate(true);
        }
    })
}
let myfordata = "";
    const loadupdateData = () => {
        state.cityid = cityid;
        if (myfordata !== null) {

            updateData();
}
}

const {state_name,stateid}=state;
const {city_name,cityid} =state;


   return(
     <>{
        register?<><AreaRegis/></>:
    <>
    <Dashboard/>
        <div className="container" style={{marginTop:"170px"}}>
        <form 
        className="container border border-danger col-sm-offset-2 col-sm-4 mt-4"
        style={{backgroundColor:'#0B0B45',borderRadius:"10px"}} onSubmit={handleSubmit}>
           
            <h3 className="text-center text-danger">City Registration</h3>
        
        <div className="container mb-4">
          <select  
          className="form-control"  
          onChange={handleChange} 
          name="state_name"
          value={state_name ||""}>
            <option> select state </option>
            {
                Object.keys(Loadstate).map((id,index)=>{
                    return(
                        <option>{Loadstate[id].state_name}</option>
                    )
                }

                )
            }
          </select>
        </div>

     <div className="container mb-3">
                <input 
                type="text"
                name="city_name"
                onChange={handleChange}
                value={city_name ||""}
                className="form-control"
                placeholder="Enter the city name"/>

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
   );
   }
   
export default CityRegis;