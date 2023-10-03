const INIT_DATA = {
    Loadstate: [],
    Loadcity: [],
    Loadarea: [],
    Loadtypeshow:[],
    Loadproduct:[],
    Loadregis:[],
    Loadmember:[],
    Loadregisimg:[],
    Loadmemberimg:[],
    Loadadmin:[],
    Loadadminimg:[],
    Loadmemberregis:[],
    LoadmemberregisImg:[],
    LoadMember_Detail:[]
};
export const cartreducer = (state = INIT_DATA, action) => {
    switch (action.type) {
        ////////////////state data//////////////////
        case "Load_State_Table":
            state.Loadregis=[];
            state.Loadregisimg=[];
            return { ...state, Loadstate: action.payload };

        //////////////////////city data///////////////////////
        case "Load_City_Table":
            return { ...state, Loadcity: action.payload };

        /////////////// area data///////////////////////
        case "Load_Area_Table":
            return { ...state, Loadarea: action.payload };

        ////////////////showroom data/////////////////////////
        case "Load_Showroomtype_Table":
            return { ...state, Loadtypeshow: action.payload };

        ///////////////product data//////////////////////////
        case "Load_Product_Table":
            return { ...state, Loadproduct: action.payload };

        ///////////////regis data/////////////////////////////
        case "Load_Regis_Table":
            return { ...state, Loadregis: action.payload };

      ///////////////memberregis data/////////////////////////////
        case "Load_MemberRegis_Table":
            return { ...state, Loadmemberregis: action.payload };


       ///////////////regisimg data/////////////////////////////
        case "Load_Regis_ImageTable":
            return { ...state, Loadregisimg: action.payload };

        ///////////////memberregisimg data/////////////////////////////
        case "Load_MemberRegisImg_Table":
            return { ...state, LoadmemberregisImg: action.payload };


         ///////////////admin data/////////////////////////////
         case "Load_Admin_Table":
            return { ...state, Loadadmin: action.payload };

       ///////////////adminimg data/////////////////////////////
        case "Load_Admin_ImageTable":
            return { ...state, Loadadminimg: action.payload };

        ////////////////member data//////////////////////
        case "Load_Member_Table":
            return {...state,  Loadmember:action.payload };

     //////////////memberimg data//////////////////////
        case "Load_Member_ImageTable":
            return {...state,  Loadmemberimg:action.payload };
        
      ////////////login member detail///////////////////
        case "LOGIN_MEMBER_DETAIL":
                return {...state,  LoadMember_Detail:action.payload };
            
        default:
            return state;

    }
}