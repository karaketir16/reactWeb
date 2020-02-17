import {combineReducers} from "redux"
const initialState = 
{
    username : "deneme",
    password : "deneme",
    email : "deneme"
};
  

function userReducer(state = initialState, action) 
{
    if (action.type === "LOGIN")
    {
        return action.payload;
    }
    return state;
}
const allReducers = combineReducers({
    user: userReducer
});
export default allReducers;