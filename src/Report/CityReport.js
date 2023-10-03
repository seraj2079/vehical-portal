import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_CityData} from "../redux/action";
import { Button } from "react-bootstrap";
import database from "../Firebase";
import { NavLink } from "react-router-dom";
// import "../../css/City.css";
import Dashboard from "../component/Dashboard";

const CityReport =() => {

//================data call from store============================
 
 const {Loadcity} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_CityData());
    },
  [] );

  // console.log("City Data----------",Loadcity);

  //===================Delete section===============================

  const onDelete = (id) => {
    database.ref(`city_table/${id}`).remove((err)=>{
      if(err){
        alert("data not deleted");
      }
      else{
        alert("data deleted");
      }
    }
    )
   }

    return(
      <>
      <Dashboard/>
        <div  className="container border border-danger mb-2"
        style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>
          <table id="id" className="container text-light mt-10">
          <thead style={{backgroundColor:"#0B0B45"}}>
          <tr className='text-center'>
                <td className='thead'>S no.</td>
                <td className='thead'>State id</td>
                <td className='thead'>State name</td>
                <td className='thead'>City id</td>
                <td className='thead'>City name</td>
                <td className='thead'>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadcity).map ((id,index)=>{
                  return(
                      <tr key={id} className="text-center">
                      <td scope="row" className='cityData'>{index + 1}</td>  
                      <td className='cityData'>{Loadcity[id].stateid}  </td>
                      <td className='cityData'>{Loadcity[id].state_name}</td>
                      <td className='cityData'>{Loadcity[id].cityid}</td>
                      <td className='cityData'>{Loadcity[id].city_name}</td>
                      
                      <td className="cityData"> 
                      <NavLink to={`/edit_CityReport/${id}`}>
                     <Button className='m-2 btn btn-warning text text-light'>
                          Edit
                       </Button>
                         </NavLink>
                      <Button className="m-2 btn btn-danger text text-light"
                      onClick={()=>onDelete(id)}>
                         Delete
                      </Button>
                     </td>
                    </tr>
                  );
                }
                  
                )
              }
            </tbody>

          </table>

        </div>
        </>
    );
}
export default CityReport;