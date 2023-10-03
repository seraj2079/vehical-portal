import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { Load_MemberRegisData, Load_MemberRegisImage } from "../redux/action";
import MemberDash from "../component/MemberDash";
// import "../../css/Regis.css";
import { Link } from 'react-router-dom';


const RegisReport = () => {

  //================data call from store====================

  const { Loadmemberregis } = useSelector(state => state.cartreducer);
  const { LoadmemberregisImg } = useSelector(state => state.cartreducer);


  console.log("Loadmemberregis-=========", Loadmemberregis);
  console.log("LoadmemberregisImg-=========", LoadmemberregisImg);

  let loadDataArray=[];

    Object.keys(Loadmemberregis).map(key=>{
    Object.keys(Loadmemberregis[key]).map(key2=>{
    Object.keys(Loadmemberregis[key][key2]).map(key3=>{
    Object.keys(Loadmemberregis[key][key2][key3]).map(id =>{
   loadDataArray.push(Loadmemberregis[key][key2][key3][id]);
   
        })
        })
    })
  })


    

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(Load_MemberRegisData());
    dispatch(Load_MemberRegisImage());


  }, [])


  // const imageLoad = (shopid, mob) => (

  //   Object.keys(LoadmemberregisImg[mob]).map((id1, index) => {
  //     console.log(shopid, mob)
  //     global.imgdata = LoadmemberregisImg[mob][id1].shop_img;

  //     return (
  //       <img src={global.imgdata} height="40" width="40" />
  //     )
  //   })
  // )

 
  return (
    <>
      <MemberDash/>
      <h3 className="text-center text-danger "> Registration Detail </h3>
      <div className="container border border-danger mb-2 mt-4"
        style={{ backgroundColor: "#0B0B45", borderRadius: '12px', fontSize: "14px" }}>
        <table className="container text-light mt-4 mb-2 mt-8">
          <thead>
            <tr className="text-center">
              <td className='thead'>S no.</td>
              <td className='thead'>mob number</td>
              <td className='thead'>shop id</td>
              <td className='thead'>shop name</td>
              <td className='thead'>Type</td>
              <td className='thead'>state name</td>
              <td className='thead'>city name</td>
              <td className='thead'>area name</td>
              <td className='thead'>shop address</td>
              <td className='thead'>area pin</td>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(loadDataArray).map((id1, index) => {
                return (
                    <tr key={id1} className="text-center" scope="row">
                    <td className='tdata-regis'>{index + 1}</td>
                    <td className='tdata-regis'>{loadDataArray[id1].mob_number}  </td>
                    <td className='tdata-regis'>{loadDataArray[id1].shopid}     </td>
                    <td className='tdata-regis'>{loadDataArray[id1].shop_name}  </td>
                    <td className='tdata-regis'>{loadDataArray[id1].showroom_name}</td>
                    <td className='tdata-regis'>{loadDataArray[id1].state_name} </td>
                    <td className='tdata-regis'>{loadDataArray[id1].city_name}  </td>
                    <td className='tdata-regis'>{loadDataArray[id1].area_name}  </td>
                    <td className='tdata-regis'>{loadDataArray[id1].shop_address} </td>
                    <td className='tdata-regis'>{loadDataArray[id1].area_pin}  </td>
                    {/* <td>
                    {imageLoad(loadDataArray[id1].shopid, loadDataArray[id1].mob_number)}
                    </td> */}
                  </tr>
                );

             })
             }
          

          </tbody>

        </table>

      </div>
    </>
  );
}
export default  RegisReport;