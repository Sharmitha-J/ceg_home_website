import React,{useState,useEffect,useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

export const Adminfeedback = () => {
    const { state, dispatch } = useContext(noteContext);


  const navigate = useNavigate();
  useEffect(() => {
  
  if(localStorage.getItem('admintoken')){
    dothis()
    getalldata()
}else{
    dothis()
    navigate("/adminsignin")
}
  
},[]);
 function dothis(){
  dispatch({ type: 'UPDATE_VALUE', payload: false });
dispatch({ type: 'UPDATE_AVALUE', payload: true });
 }

 let bodykadata=[]
 const [submitresponse,setsubmitresponse]=useState("")
 const [newds,setnewds]=useState()


 const getalldata=async (e)=>{
  const response=await fetch(`http://${state.backend}:${state.port}/api/ad/getallfeedback`,{
      method:'get',
      headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('admintoken')
      },
      
  });
  let json=await response.json();
  let elly=document.getElementById('tbody')
  if(json.response){
  console.log(json)
  for(let i=0;i<parseInt(json.data.length);i++){

    let name=json.data[i].name
    let title=json.data[i].title
    let msg=json.data[i].message
    let did=`d${json.data[i]._id}`
    let dessignal=true
   


    bodykadata.push(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {name}
    </th>
    <td className="px-6 py-4">
       {title}
    </td>
    <td className="px-6 py-4">
        {msg}
    </td>
    <td>
    <button className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-green-400 dark:hover:bg-green-500 m-2" id={did} onClick={markread} >Mark Read</button>
    </td>
</tr>)

  }
  setnewds(bodykadata)
 
  }
  else{}


}

const markread=async(e)=>{
    const dide=e.target.id
    let delid=dide.slice(1,)
    const response=await fetch(`http://${state.backend}:${state.port}/api/c/delfeedback`,{
      method:'DELETE',
      headers:{
          'Content-Type':'application/json'
      },  body: JSON.stringify({id:delid})
      
  });
  let json=await response.json();
  console.log(json)
  if(json.response){
    // document.getElementById(dide).classList.add('divdisable')
   //deltoastshowing(1)

    document.getElementById('refdiv').click()
  }else{
    //deltoastshowing(0)
  }
  }

  let rott=360
 const reloadhistory=async(e)=>{
  console.log("not hapeening")
  let elly=document.getElementById('tero')
  
  elly.style.transform = `rotate(${rott}deg)`;
  rott=rott+360
  const tempv= await getalldata();
 }



  return (
   <>
   <div className="downward">
   <div className="one two fourth justify-content-center calcby">
 
     
   <div className='relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border h100 p-4'>
    
 
 <div className="relative overflow-x-auto sm:rounded-lg" style={{maxHeight:"400px",minWidth:"900px"}}>
     <div className='reloadhistorydiv'>
 <p className="p-2 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
             Unread Feedbacks
            
         </p>
         <div className="sbTnsdiv">
          
         
 <button className="text-black bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:focus:ring-gray-500" id='refdiv' onClick={reloadhistory}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise trotate" id='tero' viewBox="0 0 16 16">
   <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
   <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
 </svg>
 
 </button>
 </div>
         </div>
     <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
     
         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
             <tr>
                 <th scope="col" className="px-6 py-3">
                    Student Name
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Title
                 </th>
                 <th scope="col" className="px-6 py-3">
                     Description
                 </th>
                 
             </tr>
         </thead>
         <tbody id='tbody'>
         
        
             {bodykadata}
           {newds}
         </tbody>
     </table>
 </div>
 
 </div>
   </div>
   </div>
   </>
  )
}