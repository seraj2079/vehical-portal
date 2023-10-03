import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import {Load_ProductData} from "../redux/action";
import {Button} from 'react-bootstrap';
import database from "../Firebase";
import { NavLink } from "react-router-dom";
// import "../../css/Product.css";
import OwnerDash from "../component/OwnerDash";

const ProductReport =() => {

  //================data call from store=================================
 
 const {Loadproduct} = useSelector(state=>state.cartreducer);
 const dispatch = useDispatch();

   useEffect( () =>{
        dispatch(Load_ProductData());
    },
  [] );

  // console.log("product Data----------",Loadproduct);

  //=================delete section===============================
    
   const onDelete = (id) => {
    database.ref(`product_table/${id}`).remove((err)=>{
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
      <OwnerDash/>
        <div className="container border border-danger mb-2"
        style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>
          <table id="table" className="container text-light mt-10">
          <thead>
          <tr className='text-center'>
                <td className="thead">S no.</td>
                <td className="thead">product id</td>
                <td className="thead">Product name</td>
                <td className="thead">Price</td>
                <td className="thead">Detail</td>
                <td className="thead">Photo</td>
                <td className="thead">Action</td>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadproduct).map ((id,index)=>{
                  return(
                    <tr key={id} className="text-center">
                    <td scope="row" className="tdata" >{index + 1}</td>  
                      <td className="tdata">{Loadproduct[id].productid}  </td>
                      <td className="tdata">{Loadproduct[id].product_name}</td>
                      <td className="tdata">{Loadproduct[id].product_price}</td>
                      <td className="tdata">{Loadproduct[id].product_detail}</td>
                      <td className="tdata">
                       <img src={Loadproduct[id].product_img} width="80" height="80"/>
                      </td>
                      <td className="tdata">
                      <NavLink to={`/edit_ProductReport/${id}`}>
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
export default ProductReport;