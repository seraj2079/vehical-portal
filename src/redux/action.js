export const Load_State_Table = 'Load_State_Table';
export const Load_City_Table = 'Load_City_Table';
export const Load_Area_Table = 'Load_Area_Table';

const loadData = 'https://mildgadiyokamelaportal-default-rtdb.firebaseio.com/gadiyokamela/';

// fetch(loadData + '.json', {
//   method: 'DELETE'
// })
//   .then(response => {
//     if (response.ok) {
//       console.log('Table deleted successfully');
//     } else {
//       throw new Error('Error deleting table');
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });

//////////////load state data//////////////////////////
export const Load_StateData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/state_table.json`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            }
            );
            const state_data = await result.json();
            if (state_data) {
                dispatch({
                    type: Load_State_Table,
                    payload: state_data
                })
            }
            else {
                console.log("state table not load ");
            }

        }

        catch (error) {
            console.log("state table not load");
        }
    }
}
///////////////////////////////////////////////////////

//////////////load CITY data//////////////////////////
export const Load_CityData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/city_table.json`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            }
            );
            const city_data = await result.json();
            if (city_data) {
                dispatch({
                    type: Load_City_Table,
                    payload: city_data
                })
            }
            else {
                console.log("city table not load ");
            }

        }

        catch (error) {
            console.log("city table not load");
        }
    }
}
//////////////////////////////////////////////////////////

/////////////////////load AREA data///////////////////////
export const Load_AreaData = () => {

    return async dispatch => {
        try {

            const result = await fetch(`${loadData}/area_table.json`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', }
            }
            );
            const area_data = await result.json();
            if (area_data) {
                dispatch({
                    type: Load_Area_Table,
                    payload: area_data
                })
            }
            else {
                console.log("area table not load ");
            }

        }

        catch (error) {
            console.log("area table not load");
        }
    }
}
//////////////////////////////////////////////////

///////////////////load showroom data////////////////////////////////
export const Load_Showroomtype_Table = 'Load_Showroomtype_Table';
export const Load_ShowData = () => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/Showroom_table.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const show_data = await result.json();
            if (show_data) {
                dispatch({
                    type: Load_Showroomtype_Table,
                    payload: show_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }


        catch (error) {
            console.log(error);
        }
    }
}
////////////////////////////////////////////////////

//////////////load product data///////////////////////////
export const Load_Product_Table = 'Load_Product_Table';
export const Load_ProductData = () => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/product_table.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const product_data = await result.json();
            if (product_data) {
                dispatch({
                    type: Load_Product_Table,
                    payload: product_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }


        catch (error) {
            console.log(error);
        }
    }
}
//////////////////////////////////////////////////////

/////////////////load Regis data////////////////////////
export const Load_Regis_Table = 'Load_Regis_Table';
export const Load_RegisData = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/user_reg/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            }
            );


            const regis_data = await result.json();

            if (regis_data) {
                dispatch({
                    type: Load_Regis_Table,
                    payload: regis_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }



        catch (error) {
            console.log(error);
        }
    }
}
/////////////////////member registration report///////////////////////////////////
export const Load_MemberRegis_Table = 'Load_MemberRegis_Table';
export const Load_MemberRegisData = () => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/user_reg.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            }
            );
            const regis_data = await result.json();

            if (regis_data) {
                dispatch({
                    type: Load_MemberRegis_Table,
                    payload: regis_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }


        catch (error) {
            console.log(error);
        }
    }
}

////////////////////////////////////////////////

//////////////member regis img report///////////
export const Load_MemberRegisImg_Table = 'Load_MemberRegisImg_Table';
export const Load_MemberRegisImage = () => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/user_reg_img.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            }
            );


            const regis_data = await result.json();

            if (regis_data) {
                dispatch({
                    type: Load_MemberRegisImg_Table,
                    payload: regis_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }



        catch (error) {
            console.log(error);
        }
    }
}

////////////////////////////////////////////////

/////////////////load regis img data//////////////
export const Load_Regis_ImageTable = 'Load_Regis_ImageTable';
export const Load_RegisImage = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/user_reg_img/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const regis_imgdata = await result.json();
            if (regis_imgdata) {
                dispatch({
                    type: Load_Regis_ImageTable,
                    payload: regis_imgdata
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }



        catch (error) {
            console.log(error);
        }
    }
}
////////////////////////////////////////////////////////

////////////////////load admin data///////////////////////

export const Load_Admin_Table = 'Load_Admin_Table';
export const Load_AdminData = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/admin_table/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            }
            );
            const admin_data = await result.json();
            if (admin_data) {
                dispatch({
                    type: Load_Admin_Table,
                    payload: admin_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }



        catch (error) {
            console.log(error);
        }
    }
}
////////////////////////////////////////////////////////

/////////////////load admin img data//////////////
export const Load_Admin_ImageTable = 'Load_Admin_ImageTable';
export const Load_AdminImage = (stnm, ctnm, arnm) => {

    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/admin_table_img/${stnm}/${ctnm}/${arnm}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            );

            const admin_imgdata = await result.json();
            if (admin_imgdata) {
                dispatch({
                    type: Load_Admin_ImageTable,
                    payload: admin_imgdata
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }



        catch (error) {
            console.log(error);
        }
    }
}

////////////////////////////////////////////////////////////


////////////////////load member data ////////////////
export const Load_Member_Table = 'Load_Member_Table';
export const Load_MemberData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/member_table.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            );
            const member_data = await result.json();
            if (member_data) {
                dispatch({
                    type: Load_Member_Table,
                    payload: member_data
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
////////////////////////////////////////////////////////


////////////////////load memberimg data ////////////////
export const Load_Member_ImageTable = 'Load_Member_ImageTable';
export const Load_MemberImage = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/member_img_table.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            );
            const member_imgdata = await result.json();
            if (member_imgdata) {
                dispatch({
                    type: Load_Member_ImageTable,
                    payload: member_imgdata
                })
            }
            else {
                console.log("App category data not data fetch");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

////////////////login member detail////////////////////////

export const LOGIN_MEMBER_DETAIL = 'LOGIN_MEMBER_DETAIL';
export const loginMember = (loginDetail) => {

    return async dispatch => {
        dispatch({
            type: LOGIN_MEMBER_DETAIL,
            payload: loginDetail
        })
    }
}