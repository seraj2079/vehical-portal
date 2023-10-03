import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Load_RegisData, Load_RegisImage, Load_AreaData, Load_CityData, Load_StateData } from "../redux/action";
import { Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import database from "../Firebase";
// import "../../css/USER.css";
import Dashboard from "../component/Dashboard";
import { Link } from 'react-router-dom';

const initData = {
  state_name: "",
  stateid: "",
  city_name: "",
  cityid: "",
  area_name: "",
  areaid: "",
  search:""
}
const Dashboard_admin = () => {

  //================data call from store====================
  const [state, setState] = useState(initData);
  const { Loadstate } = useSelector(state => state.cartreducer);
  const { Loadcity } = useSelector(state => state.cartreducer);
  const { Loadarea } = useSelector(state => state.cartreducer);
  let { Loadregis } = useSelector(state => state.cartreducer);
  let { Loadregisimg } = useSelector(state => state.cartreducer);

  console.log("Loadregis-=========", Loadregis);
  console.log("Loadregisimg-=========", Loadregisimg);


  let loadDataArray = [];
  {
    Object.keys(Loadregis).map((id1, index1) => {
      Object.keys(Loadregis[id1]).map((id2, index2) => {
        loadDataArray.push(Loadregis[id1][id2]);
      })
    })
  }
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(Load_StateData());
    dispatch(Load_CityData());
    dispatch(Load_AreaData());


  }, [dispatch])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  let cityDataArray = [];
  Object.keys(Loadcity).map((id, index) => {
    if (state.state_name === Loadcity[id].state_name) {
      cityDataArray.push(Loadcity[id].city_name)
    }
  })

  let areaDataArray = [];
  Object.keys(Loadarea).map((id, index) => {
    if (state.city_name === Loadarea[id].city_name) {
      areaDataArray.push(Loadarea[id].area_name)
    }
  })
  
  
  if (state.state_name) {
    Object.keys(Loadstate).map((id, index) => {
      if (state.state_name === Loadstate[id].state_name) {
        state.stateid = Loadstate[id].stateid;
      }
    })
  }

  if (state.city_name) {
    Object.keys(Loadcity).map((id, index) => {
      if (state.city_name === Loadcity[id].city_name) {
        state.cityid = Loadcity[id].cityid;
      }
    })
  }

  if (state.area_name) {
    Object.keys(Loadarea).map((id, index) => {
      if (state.area_name === Loadarea[id].area_name) {
        state.areaid = Loadarea[id].areaid;
      }
    })
  }

  // =================delete section===============================

  const onDelete = (id1, stnm, ctnm, arnm, mob) => {
    database.ref(`user_reg/${stnm}/${ctnm}/${arnm}/${id1}`).remove((err) => {
      if (err) {
        alert("data not deleted");
      }
      else {
        database.ref(`user_reg_img/${stnm}/${ctnm}/${arnm}/${mob}/${id1}`).remove({});
        console.log("id1-------------",id1);
        alert("data deleted");
      }
    })
  }

  const handleSubmit = (e) => {
    dispatch(Load_RegisImage(state.state_name, state.city_name, state.area_name));
    dispatch(Load_RegisData(state.state_name, state.city_name, state.area_name));

  }

  const imageLoad = (shopid, mob) => (

    Object.keys(Loadregisimg[mob]).map((id1, index) => {
      console.log(shopid, mob)
      global.imgdata = Loadregisimg[mob][id1].shop_img;

      return (
        <img src={global.imgdata} height="40" width="40" />
      )
    })
  )

  // console.log("--------",Loadregis);
  // Loadregis = Loadregis.filter(name =>(name.shop_name).match(new RegExp(state.search, "i")))

  return (
    <>
      <Dashboard/>
      <div className='container' style={{ marginTop: "50px", flexDirection: "row" }}>
        <div className="row">
          <div className="container mb-3 col-sm-2">
            <label className='text-danger'>State Name</label>
            <select class="form-control mb-3 " name="state_name" onChange={handleChange} >
              <option selected> Select State Name</option>
              {
                Object.keys(Loadstate).map((id, index) => {

                  return (
                    <option>{Loadstate[id].state_name}</option>
                  )

                })
              }
            </select>

          </div>


          <div className="container mb-3 col-sm-2">
            <label className='text-left text-danger'>City Name</label>
            <select class="form-control mb-3" name="city_name" onChange={handleChange}>
              <option selected> Select City Name</option>
              {
                Object.keys(cityDataArray).map((id, index) => {
                  return (
                    <option>{cityDataArray[id]}</option>
                  )
                })
              }
            </select>

          </div>

          <div className="container mb-3 col-sm-2">
            <label className='text-danger'>Area</label>
            <select class="form-control mb-3" name="area_name" onChange={handleChange} >
              <option selected> Select area</option>
              {
                Object.keys(areaDataArray).map((id, index) => {
                  return (
                    <option>{areaDataArray[id]}</option>
                  )
                })
              }
            </select>

          </div>
          <div className="container mb-3 col-sm-2" style={{ marginTop: "25px" }}>
            <button
              type="button"
              className="btn btn-success text "
              onClick={() => {
                handleSubmit()
              }}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='container' style={{ marginTop: "50px", flexDirection: "row" }}>
        <div className="row">
          <h3 className="text text-center text-danger">Registration Detail </h3>

          <div className="container mb-2 col-sm-2" style={{ marginTop: "20px", marginRight: "20px" }}>
            <input
              type="text"
              name="search"
              className="form-control"
              onChange={handleChange}
              placeholder="Search" />
           </div>
        </div>
      </div>

      <div className="container border border-danger mb-2 mt-4"
        style={{ backgroundColor: "#0B0B45", borderRadius: '12px', fontSize: "14px" }}>
       <table id="table" className="container text-light mt-4 mb-2 mt-8">
          <thead className="text-center">
            <tr>
              <td className="User">S no.</td>
              <td className="User">mob number</td>
              <td className="User">shop id</td>
              <td className="User">shop name</td>
              <td className="User">Type</td>
              <td className="User">state name</td>
              <td className="User">city name</td>
              <td className="User">area name</td>
              <td className="User">shop address</td>
              <td className="User">area pin</td>
              <td className="User">shop img</td>
              <td className="User">Action</td>
            </tr>
          </thead>
          <tbody>
            {((Loadregis.length != 0 && Loadregisimg.length != 0)) ? <>{
              Object.keys(Loadregis).map((id1, index1) => {

                return (
                    <tr className="text-center" key={[id1]}>
                    <td scope="row" className="User"> {index1 + 1} </td>
                    <td className="User"> {Loadregis[id1].mob_number}  </td>
                    <td className="User">{Loadregis[id1].shopid}     </td>
                    <td className="User">{Loadregis[id1].shop_name}  </td>
                    <td className="User">{Loadregis[id1].showroom_name}  </td>
                    <td className="User">{Loadregis[id1].state_name} </td>
                    <td className="User">{Loadregis[id1].city_name}  </td>
                    <td className="User">{Loadregis[id1].area_name}  </td>
                    <td className="User">{Loadregis[id1].shop_address} </td>
                    <td className="User">{Loadregis[id1].area_pin}  </td>
                    <td className="tdata">
                    {imageLoad(Loadregis[id1].shopid, Loadregis[id1].mob_number)}
                    </td>

                     <td className="tdata">
                      <NavLink to={`/edit_RegisReport/${id1}`}>
                        <Button className='m-2 btn btn-warning text text-light'>
                          Edit
                        </Button>
                      </NavLink>
                      <Button className="m-2 btn btn-danger text text-light"
                        onClick={() => onDelete(id1, Loadregis[id1].state_name, Loadregis[id1].city_name, Loadregis[id1].area_name)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );

             }
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
export default  Dashboard_admin;
