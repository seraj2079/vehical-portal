import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import database from "../Firebase";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { Load_StateData, Load_AreaData, Load_CityData, Load_RegisData, Load_AdminData } from '../redux/action';
import logo from '../images/images.jpeg';
import {NavLink } from "react-router-dom";
import OwnerDash from "../component/OwnerDash";
import Home from "../component/Home";
 
    const initialData={
        state_name:"",
        stateid:"",
        city_name:"",
        cityid:"",
        area_name:"",
        areaid:"",
        mob_number:"",
        pass:""

     }

 let cityDataArray=[];
 let areaDataArray=[];

 const i = 0;
global.registered_contact = 0;
global.registered_contactid = 0;
global.registered_state = 0;
global.registered_city = 0;
global.registered_area = 0

    const SignIn =() =>{

    const[login,setLogin]=useState(false);
    const [state,setstate] =useState(initialData);
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const loginuser=[];


     // ====================data call from store==================

     const { Loadstate } = useSelector(state => state.cartreducer);
     const { Loadcity } = useSelector(state => state.cartreducer);
     const { Loadarea } = useSelector(state => state.cartreducer);
     const { Loadregis } = useSelector(state => state.cartreducer);
     const { Loadadmin } = useSelector(state => state.cartreducer);


     const dispatch = useDispatch();
 
     useEffect(() => {
         dispatch(Load_StateData());
         dispatch(Load_CityData());
         dispatch(Load_AreaData());
         dispatch(Load_RegisData());
         dispatch(Load_AdminData());
     }, []);

     const errors = {
        uname: "invalid username"
      };
    

     cityDataArray = [];
    Object.keys(Loadcity).map((id, index) => {
        if (state.state_name === Loadcity[id].state_name) {
            cityDataArray.push(Loadcity[id].city_name)
        }
    })

    areaDataArray = [];
    Object.keys(Loadarea).map((id, index) => {
        if (state.city_name === Loadarea[id].city_name) {
            areaDataArray.push(Loadarea[id].area_name)
        }
    })


//----------------data send firebase------------------------
    const handleChange =(e)=>{
        const {name,value}=e.target;
        setstate({...state,[name]:value});
    
    }
    const handleSubmit =(e)=>{

      dispatch(Load_RegisData(state.state_name,state.city_name,state.area_name))
      dispatch(Load_AdminData(state.state_name,state.city_name,state.area_name))
    e.preventDefault();
    
    var { uname, pass ,state_name,city_name,area_name} = document.forms[0];
    Object.keys(Loadregis).map((id, index) => {

      // Compare user info
      if (Loadregis) {
        if (
            Loadregis[id].state_name === state_name.value && 
            Loadregis[id].city_name === city_name.value && 
            Loadregis[id].area_name === area_name.value && 
            Loadregis[id].mob_number === uname.value && 
            Loadregis[id].password === pass.value) {
          setIsSubmitted(true);
          global.registered_contact = Loadregis[id].mob_number
          global.registered_contactid = Loadregis[id].password
          global.registered_state = Loadregis[id].state_name
          global.registered_city = Loadregis[id].city_name
          global.registered_area = Loadregis[id].area_name
          alert('login', Loadregis[id].password);
          dispatch(Load_RegisData(state.state_name,state.city_name,state.area_name));
        }
    }
    else {
      // Username not found
      alert('incorrect number')
      setErrorMessages({ name: "username", message: errors.username });
      alert("Incorrect Mobile Number");
    }

  }
  )


  Object.keys(Loadadmin).map((id, index) => {

    // Compare user info
    if (Loadadmin) {
      if (
          Loadadmin[id].state_name === state_name.value && 
          Loadadmin[id].city_name === city_name.value && 
          Loadadmin[id].area_name === area_name.value && 
          Loadadmin[id].mob_number === uname.value && 
          Loadadmin[id].password === pass.value) {
        setLogin(true);
        global.registered_contact = Loadadmin[id].mob_number
        global.registered_contactid = Loadadmin[id].password
        global.registered_state = Loadadmin[id].state_name
        global.registered_city = Loadadmin[id].city_name
        global.registered_area = Loadadmin[id].area_name
        alert('login', Loadadmin[id].password);
        dispatch(Load_AdminData(state.state_name,state.city_name,state.area_name));
      }
  }
  else {
    // Username not found
    alert('incorrect number')
    setErrorMessages({ name: "username", message: errors.username });
    alert("Incorrect Mobile Number");
  }

}
)
 };
 const renderErrorMessage = (name) =>
 name === errorMessages.name && (
   <div className="error">{errorMessages.message}</div>
 );
    


    const renderForm =(
      <>
         <div className="container" style={{marginTop:"170px"}}>
            <form onSubmit={handleSubmit}
            className="container border border-danger
            col-sm-offset-1 col-sm-3 mt-3"
            style={{backgroundColor:"#0B0B45",borderRadius:'10px'}}>

                <div className="mt-4" >
                    <center>
                        <img src={logo} height="100" width="100" style={{borderRadius:"65px"}}/>
                    </center>
                     
                </div>

                <h3 className="text-center text-warning ">
                   SignIn
                </h3>

                <div className="container mb-4 text-danger">
                        <select onChange={handleChange} className="form-control" name="state_name">
                            <option>Select State Name</option>
                            {
                                Object.keys(Loadstate).map((id, index) => {
                                    return (
                                        <option>{Loadstate[id].state_name}</option>
                                    )
                                })
                            }

                        </select>
                   </div>
                   <div className="container mb-4 text-danger">
                        <select onChange={handleChange} className="form-control mb-4" name="city_name">
                            <option selected>Select City Name</option>
                            {
                                Object.keys(cityDataArray).map((id, index) => {
                                    return (
                                        <option>{cityDataArray[id]}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className="container mb-4 text-danger">
                        <select onChange={handleChange} className="form-control mb-4" name="area_name">
                            <option selected>Select Area Name</option>
                            {
                                Object.keys(areaDataArray).map((id, index) => {
                                    return (
                                        <option>{areaDataArray[id]}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    

                <div className="container mb-4">
                    <input  
                    type="number"
                    maxLength={"10"}
                    name="uname"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the Mobile No."/>
                    {renderErrorMessage("uname")}

                
                </div>  

                <div className="container mb-4">
                        <input
                            onChange={handleChange}
                            type="password" 
                            name="pass"
                            className="form-control"
                            placeholder=" Enter Password" />
                          {renderErrorMessage("pass")}
            
                    </div>

                    <div className="container text-center">
                 <button
                type="submit"
                className="btn btn-warning text mb-4">
                Log In
              </button>
            </div>
            
                <h5 className="text-center text-warning mb-4" style={{marginLeft:"170px"}}>
                   <NavLink to="/member_login"> Register </NavLink>
                </h5>


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
                <OwnerDash/>
              }
            </div>
            :
            login ?
            <div>
              {
                <Home/>
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

export default SignIn;