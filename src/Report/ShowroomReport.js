import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_ShowData} from "../redux/action";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import database from "../Firebase";
// import "../../css/Showroom.css";
import Dashboard from "../component/Dashboard";


const ShowroomReport =() => {

  //============data call from section===========================
 
 const {Loadtypeshow} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch( Load_ShowData());
    },
  [] );

  // console.log("show data----------",Loadtypeshow);

  //==================Delete section================================
  const onDelete = (id) => {
    database.ref(`Showroom_table/${id}`).remove((err)=>{
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
        <div  className="container border border-danger mb-2"
        style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>
          <table id="table" className="container text-light">
          <thead style={{backgroundColor:"#0B0B45"}}>
          <tr className='text-center'>
                <td className="thead"> S no.</td>
                <td className="thead">Showroom id</td>
                <td className="thead">Showroom name</td>
                <td className="thead">Action</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadtypeshow).map ((id,index)=>{
                  return(
                      <tr key={id}  scope="row" className="text-center">
                      <td className="tdata">{index +1}</td>
                      <td className="tdata">{Loadtypeshow[id].showroomid}  </td>
                      <td className="tdata">{Loadtypeshow[id].showroom_name}</td>
                      <td className="tdata"> 
                      <NavLink to={`/edit_ShowroomReport/${id}`}>
                     <Button className='m-2 btn btn-warning text text-light'>
                          Edit
                       </Button>
                         </NavLink>    
                      <Button className='m-2 btn btn-danger text text-light'
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
export default ShowroomReport;