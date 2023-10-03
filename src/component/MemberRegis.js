import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
import logo from '../images/images.jpeg';
import shortid from "shortid";
import database from "../Firebase";
import FileResizer from "react-image-file-resizer";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Load_MemberData, Load_MemberImage } from'../redux/action';
import Dashboard from "./Dashboard";


const memberData={
    memberid:"",
    member_name:"",
    father_name:"",
    member_number:"",
    member_address:"",
    password:""
 }

 const memberImgData = {
    memberid:"",
    imgdata: ""

}
let myfordata="";
const MemberRegis = () => {

    const [state,setState] =useState(memberData);
    const [userimg,setUserImg] = useState(memberImgData);
    const [register,setRegister]=useState(false);
    const [update,setUpdate] = useState(false);

    const {id}=useParams();
    let matchid=id;

    console.log("match--------",matchid);

    const { Loadmember } = useSelector(state => state.cartreducer);
    const { Loadmemberimg } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(Load_MemberData());
        Object.keys(Loadmember).map((id,index)=>(
            Object.keys(Loadmember[id]).map((id1,index)=>{
                if (matchid ===id1){
                    setState({...Loadmember[id][id1]})
                }
            })
        ))
    },[id])

    useEffect(()=>{
        dispatch(Load_MemberImage());
        Object.keys(Loadmemberimg).map((id,index)=>(
            Object.keys(Loadmemberimg[id]).map((id1,index)=>{
                if (matchid ===id1){
                    setUserImg({...Loadmemberimg[id][id1]})
                }
            })
        ))
    },[id])
    
    
const handleChange =(e)=>{
    const {name,value}=e.target;
    setState({...state,[name]:value});
}

const handleSubmit =(e)=>{
    const idData = shortid.generate();
    state.memberid=idData;
    userimg.memberid = idData;
    state.password=idData;

    if(id)
    {
        loadupdateData()
    }
    else{
        dataInsert()
    }
e.preventDefault();
}

let mob = state.member_number;


const updateData=()=>{
    database.ref(`member_table/${mob}/${id}`).set(state,(err)=>{
        if (err) {
            alert("member not update" +err);
        }
        else {
            database.ref(`member_img_table/${mob}/${id}`).set(userimg);
            alert("member updated");
            setUpdate(true);
        }
    })
}

const dataInsert = () => {
database.ref(`member_table/${mob}`).push(state,(err)=>{
    if(err) {
        alert("Member is not register");
    }
    else{
        database.ref(`member_img_table/${mob}`).push(userimg);
        alert("Member is register"+state.password);
        setRegister(true);
    }
    }

);
}

const loadupdateData=()=>{
    state.memberid=memberid;
    if(myfordata !==null){
        updateData();
    }
    else{
        userimg.imgdata=imgdata;
        updateData();
    }
}
const {member_name,father_name,member_number,member_address,memberid}=state;
const {imgdata}=userimg;

// ===============image section===========

const imageLoad = (e) => {

    var fileInput = false;
    if (e.target.files[0]) {
        fileInput = true;
    }
    if (fileInput) {
        try {
            FileResizer.imageFileResizer(
                e.target.files[0],
                300,
                300,
                "JPEG",
                200,
                0,
                (uri) => {
                 userimg.imgdata = uri;
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

    return (
        <>
        {
            register?<><Dashboard/> </>:
        <>
        <Dashboard/>
            <div className="container" style={{ marginTop: "150px" }}>
                <form onSubmit={handleSubmit} className="container border border-danger
            col-sm-offset-1 col-sm-3 mt-4"
                    style={{ backgroundColor: "#0B0B45", borderRadius: '10px' }}>
                    <div className="mt-4">
                        <center>
                        <img src={logo} height="100" width="100" style={{borderRadius:"65px"}}/>
                        </center>
                    </div>
                    <h3 className="text-center text-warning ">
                        Member Registration
                    </h3>
                    <div className="container mb-4">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="member_name"
                            value={member_name ||""}
                            className="form-control"
                            placeholder="Enter name"
                             />
                    </div>
                    <div className="container mb-4">
                        <input
                        onChange={handleChange}
                            type="text"
                            name="father_name"
                            value={father_name ||""}
                            className="form-control"
                            placeholder="Enter Father Name"
                             />
                    </div>
                    <div className="container mb-4">
                        <input
                        onChange={handleChange}
                            type="number"
                            name="member_number"
                            value={member_number ||""}
                            className="form-control"
                            placeholder="Enter Number"
                             />
                    </div>
                    <div className="container mb-4">
                        <input
                            type="file"
                            name="imgdata"
                            className="form-control"
                            placeholder="Select image"
                            onChange={imageLoad}
                             />
                    </div>
                    <div className="container mb-4">
                        <input
                        onChange={handleChange}
                            type="text"
                            name="member_address"
                            value={member_address ||""}
                            className="form-control"
                            placeholder="Enter Address"
                             />
                    </div>
                   
                    <div className="container text-center mb-4">
                        <Button
                            type="submit"
                            className="btn btn-warning text ">
                            {id?"update":"register"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
}
</>
    );
}

export default MemberRegis;