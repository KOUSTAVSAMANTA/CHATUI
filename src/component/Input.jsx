import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';
import { ChatContext } from '../Context/Chatcontext';
import Attach from "../img/attach.png"
import Img from "../img/img.png"
import Mic from "../img/mic3.png"
import Rec from "../img/rec2.png"
import MicRecorder from 'mic-recorder-to-mp3';



const Mp3Recorder = new MicRecorder({ bitRate: 128 });


const api = {
  "key": 'https://api.elastabot.ml/'
}

// auth = localStorage.setItem("auth", imageSrc)

var dt = ['Account','Name','Age','Phone','Email','Address','Type','DOB']
var dict = {}
var dict2 = {}
var flag = true


const Input = () => {
  const [record,setRecord] = useState(1)
  const [plc,setPLC] = useState('Type Something...')
  const naviget = useNavigate()
  const {dispatch} = useContext(ChatContext);
  const {data} = useContext(ChatContext);
  console.log("data",data["user"])
  const [text,setText] = useState("");
  const [img,setImg] = useState("");
  const [state, setState] = useState(data['msg'][data['user']]);
  let st = data
//   console
//   console.log("stated",state)
  const handleSend = () =>{
    setState({chat:data['msg'][data['user']]['chat']});
    console.log("stated-click",st)
    // console.log("dispatching",data["msg"],state['chat'][state['chat'].length-1])

    if(img){
      console.log(img)

    }else{
        
        let _z = st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-1]['msag'];
        let nal = data['user']
        // let _z = state['chat'][state['chat'].length-1]['msag'];
            // axios.post(api["key"]+'embed',{'msg':tasks,'txt':val })
        // .then(resr=>{
        console.log("prev message",_z)
        // console.log(st)
        let val = text
            // val.includes("pay") ||
        if((val.includes("pay") || val==='3' && (_z==='4) update a Field' || _z==='do you want to continue yes or no'))  && flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:"Please provide the payer name"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],nal:{"msg":state}}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
                // console.log(state);

        }
        else if (_z === "Please provide the payer name"&& flag===true ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:"How much would you like to transfer?"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            dict2["sender"] = val
                // console.log(state);

        }
        else if (_z === "How much would you like to transfer?"&& flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            // axios.post( api["key"]+'payer',{'msg':"hi" })
            // .then(res=>{
            //         let ch = st['msg'][st['user']]['chat']
            //         // ch.push({from:'our',msag:val});
            //         ch.push({from:'cb',msag:res.data});
            //         setState({chat:ch});
            //         st['msg'][st['user']]['chat'] = ch
            //         let payld = {"user":data['user'],"msg":state}
            //         dispatch({type:"msg",payload:st})
            //         localStorage.setItem("msg",text)
            //         // console.log(state);
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });
            ch.push({from:'cb',msag:"please enter the payee name"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            dict2["Amount"] = val;
            // console.log(state);
        }
        else if ((_z === "please enter the payee name" || st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-2]['msag'] === "please enter the payee name") && flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            dict2["receiver"] = val
            ch.push({from:'cb',msag:`i understood to pay ${dict2['receiver']} from ${dict2["sender"]} of Amount ${dict2['Amount']}`});
            ch.push({from:'cb',msag:'Yes or No'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
                // console.log(state);

        }
        else if (_z === 'Yes or No' && val.toLowerCase().includes('yes')&& flag===true ){
            axios.post( api["key"]+'transact',{'msg':dict2 })
                .then(res=>{
                    let ch = st['msg'][st['user']]['chat']
                    ch.push({from:'our',msag:val});
                    ch.push({from:'cb',msag:res.data});
                    dict2 = {}
                    ch.push({from:'cb',msag:'do you want to continue yes or no'});
                    setState({chat:ch});
                    st['msg'][st['user']]['chat'] = ch
                    let payld = {"user":data['user'],"msg":state}
                    dispatch({type:"msg",payload:st})
                    localStorage.setItem("msg",text)
                    // console.log(state);
                })
                .catch(err=>{
                    console.log(err);
                });
        }
        else if (_z === 'do you want to continue yes or no' && st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-2]['msag'] === "check payer name either sender or receiver's Acc name doesn't exists." ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            dict2 = {}
            ch.push({from:'cb',msag:"Please provide the payer name"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
        }
        else if (_z === 'do you want to continue yes or no' && st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-2]['msag'] === "you do not have enough balance" ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            // dict2 = {}
            ch.push({from:'cb',msag:"How much would you like to transfer?"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
        }
        else if (_z === 'Yes or No' && val.toLowerCase().includes('no')&& flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'ok payment canceled'});
            dict2 = {}
            ch.push({from:'cb',msag:'do you want to continue yes or no'});
            dict2["receiver"] = val
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
                // console.log(state);
        }

        else if (_z === 'do you want to continue yes or no' && val.toLowerCase().includes('yes')&& flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'Press 1 to create an Account .'});
            ch.push({from:'cb',msag:'Press 2 to see Account Details .'});
            ch.push({from:'cb',msag:'type make payment to create a transaction.'});
            // "4) update a Field"
            ch.push({from:'cb',msag:'4) update a Field'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
        }
        else if (_z === 'do you want to continue yes or no' && val.toLowerCase().includes('no')&& flag===true){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'Thank you'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            flag = false
            api['key'] = ''
        }

        else if ((val.toLowerCase().includes('update')|| val==="4")&& flag===true ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'Please Enter Account number to change details'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            dict={}
            // flag = false
            // api['key'] = ''
        }
        else if (_z==='Please Enter Account number to change details' && flag===true ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'please give the Field Name to change'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            dict['Accno'] = val
            // flag = false
            // api['key'] = ''
        }
        else if (_z==='please give the Field Name to change' && flag===true ){
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:'please enter the value that need to be Replaced'});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            dict['fieldname'] = val
            // flag = false
            // api['key'] = ''
        }
        else if (_z==='please enter the value that need to be Replaced' && flag===true ){
            // let ch = st['msg'][st['user']]['chat']
            // ch.push({from:'our',msag:val});
            // ch.push({from:'cb',msag:'do you want to continue yes or no'});
            // setState({chat:ch});
            // st['msg'][st['user']]['chat'] = ch
            // let payld = {"user":data['user'],"msg":state}
            // dispatch({type:"msg",payload:st})
            // localStorage.setItem("msg",text)
            dict['nerdata'] = val
            console.log("final dict",dict)
            axios.post( api["key"]+'updatedata',{'msg':dict })
                    .then(res=>{
                        let ch = st['msg'][st['user']]['chat']
                        ch.push({from:'our',msag:val});
                        ch.push({from:'cb',msag:res.data});
                        ch.push({from:'cb',msag:'do you want to continue yes or no'});
                        setState({chat:ch});
                        st['msg'][st['user']]['chat'] = ch
                        let payld = {"user":data['user'],"msg":state}
                        dispatch({type:"msg",payload:st})
                        localStorage.setItem("msg",text)
                        // console.log(state);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
            // flag = false
            // api['key'] = ''
        }




        else if(val !== '' && val !== '1' && _z !== "enter your address" &&_z !==  "Do you want to continue as form or by chat?"&& _z !== "enter your email" && _z !== "enter your phone number" &&_z !== "enter your Age"  && _z !== "enter Account type Savings or Current?" && _z!== "please enter your Account Number" && _z !=='2' && _z !== "please enter your Name" && _z !== "enter your Date of Birth" && _z !== "enter Amount to be Deposited"&& val !== "2"  && val.includes("-api")===false && (val.includes("quit")||val.includes("close"))===false&& flag===true && val.toLowerCase().includes('create')===false && val.toLowerCase().includes('details')===false && val.toLowerCase().includes('pay')===false)
        {
                // console.log("enteredd")
                // axios.post('https://3c15-34-236-202-207.ngrok.io/postdata',{'msg':val})
                // .then(res1=>{
                    axios.post( api["key"]+'postdata',{'msg':val })
                    .then(res=>{
                        let ch = st['msg'][st['user']]['chat']
                        ch.push({from:'our',msag:val});
                        ch.push({from:'cb',msag:res.data});

                        ch.push({from:'cb',msag:'do you want to continue yes or no'});
                        setState({chat:ch});
                        st['msg'][st['user']]['chat'] = ch
                        let payld = {"user":data['user'],"msg":state}
                        dispatch({type:"msg",payload:st})
                        localStorage.setItem("msg",text)
                        // console.log(state);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
        }
            // API SETUP
        else if (val.includes("-api"))
        {
                api["key"] = val.replace(" -api",'');
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'cb',msag:"Api has been set you may start chating"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                flag = true
                // console.log(state);

        }
        else if (val.includes("quit")||val.includes("close"))
        {
                api["key"] = val.replace(" -api",'');
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'cb',msag:'do you want to continue yes or no'});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                flag = true
                // console.log(state);

        }
        else if ((val === "1" || val.toLowerCase().includes('create')) && _z !==  "enter your Date of Birth"&& flag===true )
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"Do you want to continue as form or by chat?"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // console.log(state);
        }
        else if ((val.toLowerCase().includes('form')) && _z ===  "Do you want to continue as form or by chat?"&& flag===true )
        {
            naviget("/register")
                // console.log(state);
        }
        else if ((val.toLowerCase().includes('chat')) && _z ===  "Do you want to continue as form or by chat?"&& flag===true )
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"please enter your Name"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // console.log(state);
        }
        else if (_z === "please enter your Account Number" && (st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-2]['msag'] === "2" ||st['msg'][st['user']]['chat'][st['msg'][st['user']]['chat'].length-2]['msag'].toLowerCase().includes('details'))&& flag===true)
            // else if(val.includes("-n"))
        {
                axios.post( api["key"]+'accdetails',{'msg':val })
                    .then(res=>{
                        let ch = st['msg'][st['user']]['chat']
                        ch.push({from:'our',msag:val});
                        ch.push({from:'cb',msag:res.data});
                        ch.push({from:'cb',msag:'do you want to continue yes or no'});
                        setState({chat:ch});
                        st['msg'][st['user']]['chat'] = ch
                        let payld = {"user":data['user'],"msg":state}
                        dispatch({type:"msg",payload:st})
                        localStorage.setItem("msg",text)
                        // console.log(state);
                    })
                    .catch(err=>{
                        console.log(err);
                    });

                    // setValue('')
                    
        }
        else if (_z === "please enter your Name" && flag===true)
        // else if(val.includes("-n"))
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter Account type Savings or Current?"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                dict["name"] = val
                // console.log(state);
        }
        else if (_z === "enter Account type Savings or Current?" && flag===true)
        // else if(val.includes("-n"))
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter your Date of Birth"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                dict["type"] = val
                // console.log(state);
        }

        else if (_z === "enter your Date of Birth" && flag===true)
            // else if(val.includes("-ac"))
        {
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter your Age"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // setValue('');
                dict["DOB"] = val.replace(' -ac','')
                // console.log(state);
        }
        else if (_z === "enter your Age" && flag===true)
            // else if(val.includes("-ac"))
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter your phone number"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // setValue('');
                dict["age"] = val
                // console.log(state);
        }
        else if (_z === "enter your phone number" && flag===true)
            // else if(val.includes("-ac"))
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter your email"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // setValue('');
                dict["ph"] = val
                // console.log(state);
        }
        else if (_z === "enter your email" && flag===true)
            // else if(val.includes("-ac"))
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"enter your address"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // setValue('');
                dict["email"] = val
                // console.log(state);
        }
        else if (_z === "enter your address" && flag===true)
            // else if(val.includes("-ac"))
        {
            let ch = st['msg'][st['user']]['chat']
            ch.push({from:'our',msag:val});
            ch.push({from:'cb',msag:"enter Amount to be Deposited"});
            setState({chat:ch});
            st['msg'][st['user']]['chat'] = ch
            let payld = {"user":data['user'],"msg":state}
            dispatch({type:"msg",payload:st})
            localStorage.setItem("msg",text)
            // setValue('');
            dict["addr"] = val.replace(' -ac','')
            // console.log(state);
        }
        else if (_z === "enter Amount to be Deposited"&& flag===true)
            // else if(val.includes("-ab"))
        {
            dict["ab"] = val.replace(' -ab','')
            axios.post(api["key"]+'createdata',{'msg':dict })
            .then(res=>{
                let ch = st['msg'][st['user']]['chat']
                    ch.push({from:'our',msag:val});
                    ch.push({from:'cb',msag:res.data});
                    ch.push({from:'cb',msag:'do you want to continue yes or no'});
                    setState({chat:ch});
                    st['msg'][st['user']]['chat'] = ch
                    let payld = {"user":data['user'],"msg":state}
                    dispatch({type:"msg",payload:st})
                    localStorage.setItem("msg",text)
                    // setValue('');
                    // console.log(state);
                })
                .catch(err=>{
                    console.log(err);
                });
                
                // setvalue('')
                // })
                // .catch(err=>{s
                //     console.log(err);
                // });
                
                // setValue('')
                dict={}
        }
        
        else if ((val === "2"|| val.toLowerCase().includes('details')) && _z !== "enter your Date of Birth"&& flag===true)
        {
                let ch = st['msg'][st['user']]['chat']
                ch.push({from:'our',msag:val});
                ch.push({from:'cb',msag:"please enter your Account Number"});
                setState({chat:ch});
                st['msg'][st['user']]['chat'] = ch
                let payld = {"user":data['user'],"msg":state}
                dispatch({type:"msg",payload:st})
                localStorage.setItem("msg",text)
                // setValue('');
                // console.log(state);
        }
      // let ch = st['msg'][st['user']]['chat']
      // ch.push({from:'our',msag:text});
      // setState({chat:ch})
      // // .push({from:'cb',msag:"Please provide the payer name"});
      // dispatch({type:"msg",payload:state})
      // localStorage.setItem("msg",text)

    }
    setText('')
    setImg('')
  }
  const onSearch = (searchTerm) => {
    setText(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };
//   const {transcript,resetTranscript} = useSpeechRecognition()
//   let active = false
  
  const audio = {};
  const handleaudiostart = () =>{
    setRecord(0)
    setPLC("Recording....")
    Mp3Recorder
        .start()
        .then(() => {
          audio['isRecording']=true 
        }).catch((e) => console.error(e));
  }
  const sendAudioFile = (url) => {
    let data = new FormData();
    data.append("file", url);
    return axios
      .post("https://api.elastabot.ml/files/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res[data]);
        dict['text'] = res
        setText(res['data'])
        console.log(dict)
        setPLC('Type Something...')
        
        return res;
      });
    }


  const handleaudio =() =>{
    setRecord(1)
    setPLC("Please Wait Processing audio....")
    // SpeechRecognition.stopListening()
    // setText(transcript)
    // // console.log("dddddddddddddddddd",transcript)
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        audio['blobURL']=blobURL
        audio['isRecording']= false
        var wavfromblob = new File([blob], "incomingaudioclip.wav");
        sendAudioFile(wavfromblob);
        
        console.log(blob,buffer)
      }).catch((e) => console.log(e));
  }
  const reset =() =>{
    console.log(audio.blobURL)
    // resetTranscript()
    audio['blobURL'] =null
    // console.log("dddddddddddddddddd",transcript)
  }
  

  return (
    <div className='input'>
        {/* {data['user']==='F&Q'?("bye"):("hello")} */}
            {dt.filter(item=>{
                const searchTerm = text.toLowerCase();
                const itm = item.toLowerCase()

                return searchTerm && itm.startsWith(searchTerm) && itm!==searchTerm && (data['user']==='F&Q' || data['user']==='Update Field')
            })
            .map((item)=>(
                <div className='dropdown'>
                <div
                onClick={() => onSearch(item)}
                className='droupdown-row'>{item}
                </div>
                </div>))
        }
      <input type="text" placeholder={plc} onChange={e=>setText(e.target.value)} value={text}/>
      {/* {console.log("sdgsdgadgag",)} */}
      {record===1?<img onClick={handleaudiostart} src={Mic}/>:
      <img src={Rec} onClick={handleaudio}/>}
      {/* <button onClick={reset}>reset</button> */}
      {/* <audio src={audio.blobURL} controls="controls" /> */}
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.file[0])}/>
        
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
export default Input