import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import shortid from 'shortid';
import database from "../Firebase";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Load_ShowData } from '../redux/action';
import Dashboard from './Dashboard';


const initData={
  showroom_name:'',
  showroomid:''
}

const Showroomtype = () => {
   
  const[state,setState]=useState(initData);
  const [register,setRegister]=useState(false);
  const [update,setUpdate] = useState(false);

const {id}=useParams();
let matchid=id;

console.log("match--------",matchid);

    const { Loadtypeshow } = useSelector(state => state.cartreducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Load_ShowData());
        Object.keys(Loadtypeshow).map((id,index)=>{
             if(matchid===id)
             {
                setState({...Loadtypeshow[id]})
             }
        })
    }, [id]);

  const showroomid1 = shortid.generate();
  
  const handleChange = (e) =>{
    const {name,value}=e.target;
    setState({...state,[name]:value});
}

    const handleSubmit=(e)=>{
      if(id) {
        state.showroomid=showroomid;
        loadupdateData()
    }
    else{
        const showroomid1= shortid.generate();
        state.showroomid=showroomid1;
       
        dataInsert()
    }
    e.preventDefault();
  }
    const dataInsert = () => {
    database.ref("Showroom_table").push(state,(err)=>{
      if(err){
        alert("showroom is not insert");
      }
      else{
        alert("showroom inserted");
        setRegister(true);
      }
    })
  }
  
  const updateData = () => {
    database.ref(`Showroom_table/${id}`).set(state, (err) => {
        if (err) {
            alert("Showroom not update");
        }
        else {
            alert("Showroom updated");
            setUpdate(true);
        }
    })
}
let myfordata = "";
    const loadupdateData = () => {
        state.showroomid=showroomid;
        if (myfordata !== null) {

            updateData();
}
}

const {showroom_name,showroomid}=state;


 return (
    <>
     <Dashboard/>
                <div className="container" style={{marginTop:"170px", alginSelf:"center"}}>
                <form 
                onSubmit={handleSubmit}
                className="container border border-danger col-sm-offset-2 col-sm-4  mt-4 mb-2" 
                style={{backgroundColor:'#0B0B45',borderRadius:"10px" }}
                >
                <h3 className="text-center text-danger" style={{margin:"30px"}}> Showroom Type Registration</h3>
                 <div className="container mb-4">
                    <input
                    type="text"
                    name="showroom_name"
                    className="form-control form-control-lg "
                    onChange={handleChange}
                    value={showroom_name ||""}
                    placeholder="Enter the shop name"
                    />
                 </div>
                 <div className="container text-center">
                    <button  
                    type="submit"
                    className="btn btn-warning text mb-4">
                     {id?"update":"register"}
                    </button>
                 </div>
               </form>
            </div>

    
    </>
    
  )
}

export default Showroomtype;