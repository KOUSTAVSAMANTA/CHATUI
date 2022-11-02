import {
    createContext,
    useContext,
    useReducer,
  } from "react";

export const ChatContext = createContext();


// const uid = localStorage.getItem('uid')

export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
      user: '',
      msg:{'':{chat:[]}}
      // msg: {chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"How can i help you?"},{from:'cb',msag:"1) create an Account "},{from:'cb',msag:"2) see Account details"},{from:'cb',msag:"3) make a payment  "}]},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            msg: {"FAQ":{chat:[{from:'cb',msag:"hi"},{from:'cb',msag:"How can i help you?"},{from:'cb',msag:"1) create an Account "},{from:'cb',msag:"2) see Account details"},{from:'cb',msag:"3) make a payment  "},{from:'cb',msag:"4) update a Field"}]}},
            // chatId:uid,
          };
        case "select_service":
          return {
            user: action.payload["user"],
            msg: action.payload["msg"],
            // chatId:uid,
          };
        case "msg":
          return {
            
            user: action.payload["user"],
            msg: action.payload["msg"],
            // msg: action.payload,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };


