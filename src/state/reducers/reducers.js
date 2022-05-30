export const nameReducer=(state="shiva",action)=>{
    if(action.type === "changeName"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const classReducer=(state="",action)=>{
    if(action.type === "changeClass"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const emailReducer=(state="",action)=>{
    if(action.type === "changeEmail"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const phoneReducer=(state="",action)=>{
    if(action.type === "changePhone"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const idReducer=(state="",action)=>{
    if(action.type === "changeId"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}
export const dataReducer=(state="",action)=>{
    if(action.type === "changeData"){
        if(action.payload !== undefined)
        return action.payload;
        else
        return state;
    }
    else{
        return state;
    }
}

