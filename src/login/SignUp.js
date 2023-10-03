import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from '../../firebase';
import  logo from '../images/images.jpeg';

    const initialData={
        member_name:"",
        memberid:"",
        member_number:""
     }
    const SignUp =() =>{
    const [state,setstate] =useState(initialData);
    
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setstate({...state,[name]:value});
    
    }
    const handleSubmit =(e)=>{
        const idData = shortid.generate();
        state.memberid=idData;
    
    e.preventDefault();
    
    database.ref("SignUp_table").push(state,(err)=>{
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
        <div className="container" style={{marginTop:"150px"}}>
            <form onSubmit={handleSubmit}
            className="container border border-danger
            col-sm-offset-1 col-sm-4 mt-4"
            style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>

           <div className="mt-4" >
                    <center>
                        <img src={logo} height="100" width="100" style={{borderRadius:"65px"}}/>
                    </center>
                     
                </div>

                <h3 className="text-center text-warning ">
                   SignUp
                </h3>

                <div className="container mb-4">
                    <input  
                    type="text"
                    name="member_name"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the member name"/>
                
                </div>

                <div className="container mb-4">
                    <input  
                    type="pin"
                    maxLength={"10"}
                    name="member_number"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the mobile no."/>
                
                </div>
                
                <div  className="container text-center">
            <button
             type="submit"
            className="btn btn-warning text mb-4"> 
              SignUp
            </button> 

                </div>

                <h5 className="text-center text-warning mb-4" style={{marginLeft:"170px"}}>
                    SignIn
                </h5>

            </form>

        </div>
        </>
    );
}

export default SignUp;
