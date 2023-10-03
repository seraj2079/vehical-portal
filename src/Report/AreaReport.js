import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_AreaData} from "../redux/action";
import { Button } from "react-bootstrap";
import database from "../Firebase";
import { NavLink } from "react-router-dom";
// import "../../css/Area.css";
import Dashboard from "../component/Dashboard";

const AreaReport =() => {

  //============data call from store=========================
 
 const {Loadarea} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_AreaData());
    },
  [] );

  // console.log("Area Data----------",Loadarea);

  //==================Delete section=======================
  const onDelete = (id) => {
    database.ref(`area_table/${id}`).remove((err)=>{
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
          <table className="container text-light mt-4 mb-2">
            <thead>
              <tr className='text-center'>
                <td className='thead'>S no.</td>
                <td className='thead'>State id</td>
                <td className='thead'>State name</td>
                <td className='thead'>City id</td>
                <td className='thead'>City name</td>
                <td className='thead'>Area id</td>
                <td className='thead'> Area name</td>
                <td className='thead'>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadarea).map ((id,index)=>{
                  return(
                    <tr key={id} className="text-center">
                    <td scope="row" className='areaData'>{index + 1}</td>  
                      <td className='areaData'>{Loadarea[id].stateid}  </td>
                      <td className='areaData'>{Loadarea[id].state_name}</td>
                      <td className='areaData'>{Loadarea[id].cityid}</td>
                      <td className='areaData'>{Loadarea[id].city_name}</td>
                      <td className='areaData'>{Loadarea[id].areaid}</td>
                      <td className='areaData'>{Loadarea[id].area_name}</td>
                      
                      <td className='areaData'> 
                      <NavLink to={`/edit_AreaReport/${id}`}>
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
export default AreaReport;