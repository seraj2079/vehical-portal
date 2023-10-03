import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_StateData} from "../redux/action";
import {Button} from 'react-bootstrap';
import database from "../Firebase";
import { NavLink } from "react-router-dom";
import Dashboard from "../component/Dashboard";
// import "../../css/State.css";


const StateReport =() => {

  //================data call from store=================================
 
 const {Loadstate} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_StateData());
    },
  [] );

  
  // console.log("state Data----------",Loadstate);

  //=================delete section===============================
    
   const onDelete = (id) => {
    database.ref(`state_table/${id}`).remove((err)=>{
      if(err){
        alert("data not deleted");
      }
      else{
        alert("data deleted");
      }
    }
    );
   }

    return(
      <>
      <Dashboard/>
      <div className="container col-lg-4 "
      style={{ backgroundColor: '#0B0B45', borderRadius: '10px' }}>
      <table  id="table" style={{justifyContent:'center',width:"100%"}}>
        <thead style={{justifyContent:'center'}}>
          <tr className='text-center'>
            <td className='thead'>S no.</td>
            <td className='thead'>State Id</td>
            <td className='thead'>State Name</td>
            <td className='thead'>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadstate).map ((id,index)=>{
                  return(
                    <tr key={id} className="text-center">
                    <td scope="row" className='stateData'>{index + 1}</td>
                    <td className='stateData'>{Loadstate[id].stateid}</td>
                    <td className='stateData'>{Loadstate[id].state_name}</td>

                     <td  className='stateData'>
                      <NavLink to={`/edit_StateReport/${id}`}>
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
export default StateReport;