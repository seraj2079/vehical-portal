import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_MemberData, Load_MemberImage} from "../redux/action";
import {Button} from 'react-bootstrap';
import database from "../Firebase";
import { NavLink } from "react-router-dom";
// import "../../css/Member.css";
import Dashboard from "../component/Dashboard";

const MemberReport =() => {

  //================data call from store====================
 
 const {Loadmember} = useSelector(state=>state.cartreducer);
 const {Loadmemberimg} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_MemberData());
        dispatch(Load_MemberImage());
    },
  [dispatch] );

  console.log("member Data----------",Loadmember);
  console.log("member imgdata-----------",Loadmemberimg);


  /////////////////delete section/////////////////////////////

  const onDelete = (id) => {
    database.ref(`member_table/${id}`).remove((err)=>{
      if(err){
        alert("data not deleted");
      }
      else{
        database.ref(`member_img_table/${id}`).remove({});
        alert("data deleted");
      }
    }
    );
   }

  const imageLoad =(mob)=>(
      Object.keys(Loadmemberimg[mob]).map((id1,index) =>{
                global.imgdata=Loadmemberimg[mob][id1].imgdata; 
                return(
                    <img src={global.imgdata} height="40" width="40"/>
                )       
      }) 
  )


    return(
      <>
      <Dashboard/>
        <div className="container border border-danger mb-2"
        style={{backgroundColor:"#0B0B45",borderRadius:'12px',fontSize:"14px"}}>
          <table  id="table" style={{justifyContent:'center',width:"100%"}}>
            <thead thead style={{justifyContent:'center'}}>
              <tr>
                <td className="member">S no.</td>
                <td className="member">member number</td>
                <td className="member">memberpassword</td>
                <td className="member" >member name</td>
                <td className="member">father name</td>
                <td className="member">member address</td>
                <td className="member">member img</td>
                <td className="member">Action</td>
                
              </tr>
            </thead>
            <tbody>
              
                 {((Loadmember.length != 0 && Loadmemberimg.length != 0)) ? <>{
                Object.keys(Loadmember).map ((id,index1)=>(
                  Object.keys(Loadmember[id]).map((id1,index)=>{

                  return(
                    <tr className="text-center" key={[id]}>
                    <td scope="row" className="member">{index1 +1}</td>
                      <td className="member">{Loadmember[id][id1].member_number}  </td>
                      <td className="member">{Loadmember[id][id1].memberid}  </td>
                      <td className="member">{Loadmember[id][id1].member_name}  </td>
                      <td className="member">{Loadmember[id][id1].father_name}  </td>
                      <td className="member">{Loadmember[id][id1].member_address}  </td>
                      <td className="member">
                      {imageLoad(Loadmember[id][id1].member_number)}
                      </td> 

                      <td className="member">
                      <NavLink to={`/edit_MemberReport/${id1}`}>
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
                
                )
                )
              }</> :
              <>Pls Load</>
              }
           

            </tbody>

          </table>

        </div>
        </>
    );
}
export default MemberReport;