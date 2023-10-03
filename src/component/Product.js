import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from "../Firebase";
import Resizer from 'react-image-file-resizer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Load_ProductData } from '../redux/action';
import OwnerDash from "./OwnerDash";

const initData={
    product_name:"",
    productid:"",
    product_price:"",
    product_img:"",
    product_detail:""
};

let myfordata ="";

const Product = () => {

    const [state,setState]=useState(initData);
    const [register,setRegister]=useState(false);
    const [update,setUpdate] = useState(false);

    const {id}=useParams();
    let matchid=id;
    
    console.log("match--------",matchid);
    
        const { Loadproduct } = useSelector(state => state.cartreducer);
        const dispatch = useDispatch();
    
        useEffect(() => {
            dispatch(Load_ProductData());
            Object.keys(Loadproduct).map((id,index)=>{
                 if(matchid===id)
                 {
                    setState({...Loadproduct[id]})
                 }
            })
        }, [id]);
    
        const productid1 = shortid.generate();


    const handleChange =(e)=>{
        const{name,value}=e.target;
        setState({...state,[name]:value});
    }
    const handleSubmit=(e)=>{
        if(id) {
            state.productid=productid;
            loadupdateData()
        }
        else{
            const productid1= shortid.generate();
            state.productid=productid1;
           
            dataInsert()
        }

        e.preventDefault();
    }
        const dataInsert = () => {
        database.ref("product_table").push(state,(err)=>{
        if(err){
            alert("product is not insert");
        }
        else{
            alert("product inserted");
            setRegister(true);
        }
        }
        
    )
 }
 const updateData = () => {
    database.ref(`product_table/${id}`).set(state, (err) => {
        if (err) {
            alert("product not update");
        }
        else {
            alert("product updated");
            setUpdate(true);
        }
    })
}
const loadupdateData = () => {
    state.productid = productid;
    if (myfordata !== null) {
        updateData();
    }
    else{
        state.product_img=product_img;
        updateData();
}
}


const {product_name,productid,product_price,product_detail,product_img}=state;

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
                        state.product_img = uri;
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
    return(
        <>
      <OwnerDash/>
      <div className="container" style={{marginTop:"150px", alginSelf:"center"}}>
      <form onSubmit={handleSubmit}
      className="container border border-danger col-sm-offset-2 col-sm-4 mt-3 mb-2" 
      style={{backgroundColor:'#0B0B45',borderRadius:"12px"}}>
      
      <h3 className="text-center text-danger" style={{margin:"30px"}}> Add Product Name</h3>
       <div className="container mb-4 text-danger">
        <label>Name</label>
          <input
          type="text"
          name="product_name"
          className="form-control form-control-lg "
          onChange={handleChange}
          value={product_name ||""}
          placeholder="Enter the product name"
          />
       </div>
       <div className="container mb-4 text-danger">
        <label>Price</label>
          <input
          type="text"
          name="product_price"
          className="form-control form-control-lg "
          onChange={handleChange}
          value={product_price ||""}
          placeholder="Enter the product price"
          />
       </div>
       <div className="container mb-4 text-danger">
         <label>Photo</label>
         <input
         type="file"
         name="product_img"
         className="form-control"
         placeholder="Select image"
        onChange={imageLoad}
         />
          </div>
          <div className="container mb-4 text-danger ">
            <label>Product Detail</label>
            <input
            type="text"
            name="product_detail"
            className="form-control"
            onChange={handleChange}
            value={product_detail ||""}
            placeholder="Enter about product"/>
          </div>
          <div className="container text-center">
              <button  
              type="submit"
             className="btn btn-success text mb-4">
              {id?"update":"register"}
              </button>
       </div>
       </form>
       </div>
    </>
    );
}

export default Product;