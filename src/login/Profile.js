import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from '../../firebase';
import logo from '../images/images.jpeg';


    const initialData={
        member_img:"",
        memberid:"",
        member_name:"",
        member_number:"",
        member_address:""
     }
    const Profile =() =>{
    const [state,setstate] =useState(initialData);
    
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setstate({...state,[name]:value});
    
    }
    const handleSubmit =(e)=>{
        const idData = shortid.generate();
        state.memberid=idData;
    
    e.preventDefault();
    
    database.ref("Profile_table").push(state,(err)=>{
        if(err) {
            alert("Member is not register");
        }
        else{
            alert("Member is register");
        }
    
    })
    }


    return(
        <>
        <div className="container" style={{marginTop:"170px"}}>
        <form  onSubmit={handleSubmit}
            className="container border border-danger
            col-sm-offset-1 col-sm-3 mt-4 mb-3"
            style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>
                  <div className="mt-4" >
                    <center>
                        <img src={logo} height="100" width="100" style={{borderRadius:"65px"}}/>
                    </center>
                     
                </div>

                <h3 className="text-center text-warning ">
                   Profile
                </h3>

                <div className="container mb-4">
                    <input  
                    type="text"
                    name="member_name"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the member name"
                    required/>
                
                </div>

                <div className="container mb-4">
                    <input  
                    type="pin"
                    minLength={"10"}
                    name="member-number"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the Number"
                    required/>
                
                </div>

                <div className="container mb-4">
                    <input  
                    type="text"
                    name="member_address"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the Address"
                    required/>
                
                </div>
                 
                <div className="container mb-4">
                    <input  
                    type="file"
                    name="member_img"
                    className="form-control"
                    onChange={handleChange}
                    required/>
                
                </div>
                <div  className="container text-center">
            <button
            className="btn btn-warning text mb-4"> 
              Update
            </button> 

                </div>


          </form>
        </div>
        </>
    );
}

export default Profile;