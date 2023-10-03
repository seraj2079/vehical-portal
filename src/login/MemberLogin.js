import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from "shortid";
import database from "../Firebase";
import  logo from '../images/images.jpeg';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Load_MemberData,loginMember } from "../redux/action";
import MemberDash from '../component/MemberDash';


 const i = 0;
 global.registered_contact = 0;
 global.registered_contactid = 0;
 global.registered_membername = 0;


const MemberLogin =() =>{
const [errorMessages, setErrorMessages] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const {Loadmember} = useSelector(state => state.cartreducer);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(Load_MemberData());
}, []);

const errors = {
    uname: "invalid username"
  };


const handleSubmit =(e)=>{
    e.preventDefault();
    var { uname, pass } = document.forms[0];
    Object.keys(Loadmember).map((id, index) => (
        Object.keys(Loadmember[id]).map((id1,index)=>{

      // Compare user info
      if (Loadmember) {
        if (
            Loadmember[id][id1].member_number === uname.value && 
            Loadmember[id][id1].password === pass.value) {
          setIsSubmitted(true);
          global.registered_contact = Loadmember[id][id1].mobile_number;
          global.registered_contactid = Loadmember[id][id1].password;
          global.registered_membername = Loadmember[id][id1].member_name;
          alert('login', Loadmember[id].password);
          dispatch(loginMember(Loadmember[id][id1]));
        }

      }
       // Username not found
       else {
        alert('incorrect number')
        setErrorMessages({ name: "username", message: errors.username });
        alert("Incorrect Mobile Number");
        
      }
        
    }
    )))
}

const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error"> {errorMessages.message}
      </div>
    );

       const renderForm =(
        <>
        <div className="container" style={{marginTop:"150px"}}>
            <form onSubmit={handleSubmit}
            className="container border border-danger
            col-sm-offset-1 col-sm-4 mt-4"
            style={{backgroundColor:"#0B0B45",borderRadius:"8px"}}>

            <div className="container mt-4 text-center">
            <center>
              <img src={logo} height="100" width="100" style={{borderRadius:"65px"}}/>
               </center>
            </div>


                <h3 className="text-center text-warning mb-3">
                   Member Login
                </h3>

                <div className="container mb-4">
                    <input  
                    type="number"
                    name="uname"
                    className="form-control"
                    placeholder="Enter the number"/>
                
                </div>

                <div className="container mb-4">
                    <input  
                    type="password"
                    name="pass"
                    className="form-control"
                    placeholder="Enter the password"/>   
                </div>
                
                 <div className="container text-center">
                 <button
                type="submit"
                className="btn btn-warning text mb-4">
                Log In
              </button>
              </div>
                <h6 className="text-center text-warning mb-4 " style={{ marginLeft:"200px"}}>
               <NavLink to="/"> <label>SignIn </label></NavLink>
                </h6>

            </form>

        </div>
        </>
    );

    return(
        <div>
        {
          isSubmitted ?
            <div>
              {
                <MemberDash/>
              }
            </div>
            :
            <div className="app">
              <div className="login-form">
                {renderForm}
              </div>
            </div>
        }
      </div>
      )
  }


export default MemberLogin;
