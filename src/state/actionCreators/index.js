export const setName=(name)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeName",
            payload:name
        })
    }
};
export const setClass=(classname)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeClass",
            payload:classname
        })
    }
};
export const setId=(id)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeId",
            payload:id
        })
    }
}
export const setEmail=(email)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeEmail",
            payload:email
        })
    }
}
export const setPhone=(phone)=>{
    return (dispatch)=>{
        dispatch({
            type:"changePhone",
            payload:phone
        })
    }
}
export const setData=(data)=>{
    return (dispatch)=>{
        dispatch({
            type:"changeData",
            payload:data
        })
    }
}