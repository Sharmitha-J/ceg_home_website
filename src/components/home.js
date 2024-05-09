import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/noteContext'
import smoke from './static/smoke.png';
import tree from './static/rocket2.png';
import photo1 from './static/treespl.jpg';
import photo2 from './static/footballteam.jpg';
import photo3 from './static/cultural.jpg';
import {Vmodalopen,Disableli,NODisableli} from './tsidebar'
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';

import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
export const Home = () => {
  const { state, dispatch } = useContext(noteContext);
  const [count, setCount] = useState(0);
  const [user_fname, setuser_fname] = useState("User");
  const [user_room, setuser_room] = useState(0);
  const [user_photourl, setuser_photourl] = useState(0);
  const [sroom,setsroom]=useState()
  const [sfloor,setfloor]=useState("Ground")
  const [sname,setsname]=useState()
  const [roombook_alert,setroombook_alert]=useState("displaynone")
  const [roombook_grid,setroombook_grid]=useState("displaynone")

  const navigate = useNavigate();
  useEffect(() => {
  console.log("useeffect")
 
  if(localStorage.getItem('token')){
    console.log("dothis")
    dothis()
    getuserdata()
    getroomnumbers()
    setCount(100);
  }
  else{
    dothis()
     navigate("/signin")
  }
},[]);
 
 function dothis(){
  dispatch({ type: 'UPDATE_VALUE', payload: true });
  dispatch({ type: 'UPDATE_AVALUE', payload: false });
 }

 const getuserdata=async()=>{
  const response=await fetch(`http://${state.backend}:${state.port}/api/auth/getuser`,{
    method:'get',
    headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
    },
    
});
let json=await response.json();
console.log(json,json.userkaname)
setsname(json.userkaname)
if(json.response){
  
dispatch({ type: 'UPDATE_NAME', payload: json.user.name });
localStorage.setItem('room_no',json.room_no)
dispatch({ type: 'UPDATE_EMAIL', payload: json.user.email });
dispatch({ type: 'UPDATE_MOBILE', payload: json.user.mobile });
dispatch({ type: 'UPDATE_room', payload: json.room_no });
dispatch({ type: 'UPDATE_photo_url', payload: `http://${state.backend}:${state.port}/api/a/newupload/${json.user.photo_url}` });
NODisableli()
}else{
  setroombook_alert("")
  setroombook_grid("")
  Disableli()
}

 if(json.response && !json.user.photo_url){
  Vmodalopen(json)
}

}
 const getroomnumbers=async()=>{
  const response=await fetch(`http://127.0.0.1:5000/api/b/roomnumbers`,{
    method:'get',
    headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
    },
    
});
let json=await response.json();
console.log(json)

for(let i=0;i<json.length;i++){
  document.getElementById('r'+json[i]).style.backgroundColor='#04d304'
  document.getElementById('r'+json[i]).classList.add('divdisable')
}

}


  const handle=async (e)=>{
   
    let roomno={sroom}
    e.preventDefault();
    const response=await fetch('http://127.0.0.1:5000/api/b/bookroom',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({room:sroom})


    });
    const json=await response.json();
    console.log(json)
    if(json.response){
      document.getElementById('roombookingalert').innerHTML=json.message
      document.getElementById('roombookingalert').style.opacity=1
      document.getElementById('roombookingalert').innerHTML= document.getElementById('roombookingalert').innerHTML+"Wait..."
      setTimeout(
        function() {
          navigate("/signin")
        }, 3000);
      
    }
    else{
     
      document.getElementById('roombookingalert').innerHTML=json.message
      document.getElementById('roombookingalert').style.opacity=1
    }
    
}

  

  const handlegender=(e)=>{
 
    let roomno=e.target.value
   setfloor(e.target.name)
   if(parseInt(roomno)>100 && parseInt(roomno)<200)
   setfloor("First")
   else if(parseInt(roomno)>200 && parseInt(roomno)<300)
   setfloor("Second")
    setsroom(roomno)
   }

   
   
  return (
   <>
<div id='roombookalert' className={`${roombook_alert} p-4 mt-5 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 `} role="alert" >
  <span className="font-medium"></span> Welcome {sname}, Your room Booking is Pending
</div>
    <div className="one two firstinhome">
      
   <div className="flex flex-wrap mt-6 -mx-3 billoone" style={{width:"100%"}} >
<div className="w-half px-3 mb-6 lg:mb-0 lg:flex-none ww50" >
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border" id="fb50">
<div className="flex-auto p-4">
<div className="flex flex-wrap -mx-3 twrem">
<div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
<div className="flex flex-col h-full">
<p className="pt-2 mb-1 font-semibold">Welcome to</p>
<h5 className="font-bold">CEG Home</h5>
<p className="mb-12">The hostel facility is available to the regular students who are on the rolls of the institute depending upon the availability.</p>
<a className="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500" target={'_blank'} href="https://ceghostel.in/">
Read More
<i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" aria-hidden="true"></i>
</a>
</div>
</div>
<div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none mbhh">
<div className="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
{/* <img src="../assets/img/shapes/waves-white.svg" className="absolute top-0 hidden w-1/2 h-full lg:block" /> */}
<div className="relative flex items-center justify-center h-full">
<img className="relative z-20 w-full pt-6" src={tree} />
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="w-half px-3 lg:flex-none belo50">
<div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4" id='underb50'>
<div className="relative h-full overflow-hidden bg-cover rounded-xl bckk">
<span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
<div className="relative z-10 flex flex-col flex-auto h-full">
{/* <h5 className="pt-2 mb-6 font-bold text-white">Gallery</h5> */}
<div id='announceslist' >
<div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={photo1} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
       
        <p>Plannted more than 100+ trees by students</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={photo2} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        {/* <h5>Second slide label</h5> */}
        <p>Sports meet was held last week</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={photo3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        
        <p>Republic day celebration</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  


 

</div>

</div>





</div>
</div>
</div>
</div>
   </div>
   <div className={`one ${roombook_grid}`} id='roombookpaytm' >
   <div className="flex flex-wrap mt-6 -mx-3 billoone">
<div className="w-half px-3 mb-6 lg:mb-0 lg:flex-none ww50">
<div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
<div className="flex-auto p-4">
<div className="flex flex-wrap -mx-3">
<div className="max-w-full px-3 lg:w-1/2 lg:flex-none maxwphul" style={{width:"100%"}}>
<div className="">
  <div className="m0 flex slktroom">
  <p className='m0 plzslkt'>Select your room </p>
 
  </div>
 <form action="" className='parent'>

  <center>Ground Floor</center>
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r1" onChange={handlegender} value="01"/>
  <span>G-01</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r2" onChange={handlegender} value="02"/>
  <span>G-02</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r3" onChange={handlegender} value="03"/>
  <span>G-03</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r4" onChange={handlegender} value="04"/>
  <span>G-04</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r5" onChange={handlegender} value="05"/>
  <span>G-05</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r6" onChange={handlegender} value="06"/>
  <span>G-06</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r7" onChange={handlegender} value="07"/>
  <span>G-07</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r8" onChange={handlegender} value="08"/>
  <span>G-08</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r9" onChange={handlegender} value="09"/>
  <span>G-09</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r10" onChange={handlegender} value="10"/>
  <span>G-10</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r11" onChange={handlegender} value="11"/>
  <span>G-11</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r12" onChange={handlegender} value="12"/>
  <span>G-12</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r13" onChange={handlegender} value="13"/>
  <span>G-13</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r14" onChange={handlegender} value="14"/>
  <span>G-14</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r15" onChange={handlegender} value="15"/>
  <span>G-15</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r16" onChange={handlegender} value="16"/>
  <span>G-16</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r17" onChange={handlegender} value="17"/>
  <span>G-17</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r18" onChange={handlegender} value="18"/>
  <span>G-18</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r19" onChange={handlegender} value="19"/>
  <span>G-19</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r20" onChange={handlegender} value="20"/>
  <span>G-20</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r21" onChange={handlegender} value="21"/>
  <span>G-21</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r22" onChange={handlegender} value="22"/>
  <span>G-22</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r23" onChange={handlegender} value="23"/>
  <span>G-23</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r24" onChange={handlegender} value="24"/>
  <span>G-24</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r25" onChange={handlegender} value="25"/>
  <span>G-25</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r26" onChange={handlegender} value="26"/>
  <span>G-26</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r27" onChange={handlegender} value="27"/>
  <span>G-27</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r28" onChange={handlegender} value="28"/>
  <span>G-28</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r29" onChange={handlegender} value="29"/>
  <span>G-29</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r30" onChange={handlegender} value="30"/>
  <span>G-30</span>
  </label>


  <br/><br/>
  <center>First Floor</center>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r101" onChange={handlegender} value="101"/>
  <span>F-101</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r102" onChange={handlegender} value="102"/>
  <span>F-102</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r103" onChange={handlegender} value="103"/>
  <span>F-103</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r104" onChange={handlegender} value="104"/>
  <span>F-104</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r105" onChange={handlegender} value="105"/>
  <span>F-105</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r106" onChange={handlegender} value="106"/>
  <span>F-106</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r107" onChange={handlegender} value="107"/>
  <span>F-107</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r108" onChange={handlegender} value="108"/>
  <span>F-108</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r109" onChange={handlegender} value="109"/>
  <span>F-109</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r110" onChange={handlegender} value="110"/>
  <span>F-110</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r111" onChange={handlegender} value="111"/>
  <span>F-111</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r112" onChange={handlegender} value="112"/>
  <span>F-112</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r113" onChange={handlegender} value="113"/>
  <span>F-113</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r114" onChange={handlegender} value="114"/>
  <span>F-114</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r115" onChange={handlegender} value="115"/>
  <span>F-115</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r116" onChange={handlegender} value="116"/>
  <span>F-116</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r117" onChange={handlegender} value="117"/>
  <span>F-117</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r118" onChange={handlegender} value="118"/>
  <span>F-118</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r119" onChange={handlegender} value="119"/>
  <span>F-119</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r120" onChange={handlegender} value="120"/>
  <span>F-120</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r121" onChange={handlegender} value="121"/>
  <span>F-121</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r122" onChange={handlegender} value="122"/>
  <span>F-122</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r123" onChange={handlegender} value="123"/>
  <span>F-123</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r124" onChange={handlegender} value="124"/>
  <span>F-124</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r125" onChange={handlegender} value="125"/>
  <span>F-125</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r126" onChange={handlegender} value="126"/>
  <span>F-126</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r127" onChange={handlegender} value="127"/>
  <span>F-127</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r128" onChange={handlegender} value="128"/>
  <span>F-128</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r129" onChange={handlegender} value="129"/>
  <span>F-129</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r130" onChange={handlegender} value="130"/>
 <span>F-130</span>
 </label>


  <br/><br/>
  <center>Second Floor</center>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r201" onChange={handlegender} value="201"/>
  <span>S-201</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r202" onChange={handlegender} value="202"/>
  <span>S-202</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r203" onChange={handlegender} value="203"/>
  <span>S-203</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r204" onChange={handlegender} value="204"/>
  <span>S-204</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r205" onChange={handlegender} value="205"/>
  <span>S-205</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r206" onChange={handlegender} value="206"/>
  <span>S-206</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r207" onChange={handlegender} value="207"/>
  <span>S-207</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r208" onChange={handlegender} value="208"/>
  <span>S-208</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r209" onChange={handlegender} value="209"/>
  <span>S-209</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r210" onChange={handlegender} value="210"/>
  <span>S-210</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r211" onChange={handlegender} value="211"/>
  <span>S-211</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r212" onChange={handlegender} value="212"/>
  <span>S-212</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r213" onChange={handlegender} value="213"/>
  <span>S-213</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r214" onChange={handlegender} value="214"/>
  <span>S-214</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r215" onChange={handlegender} value="215"/>
  <span>S-215</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r216" onChange={handlegender} value="216"/>
  <span>S-216</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r217" onChange={handlegender} value="217"/>
  <span>S-217</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r218" onChange={handlegender} value="218"/>
  <span>S-218</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r219" onChange={handlegender} value="219"/>
  <span>S-219</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r220" onChange={handlegender} value="220"/>
  <span>S-220</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r221" onChange={handlegender} value="221"/>
  <span>S-221</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r222" onChange={handlegender} value="222"/>
  <span>S-222</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r223" onChange={handlegender} value="223"/>
  <span>S-223</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r224" onChange={handlegender} value="224"/>
  <span>S-224</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r225" onChange={handlegender} value="225"/>
  <span>S-225</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r226" onChange={handlegender} value="226"/>
  <span>S-226</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r227" onChange={handlegender} value="227"/>
  <span>S-227</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r228" onChange={handlegender} value="228"/>
  <span>S-228</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r229" onChange={handlegender} value="229"/>
  <span>S-229</span>
  </label>
  
  <label>
  <input type="radio" className='roomcheckbox' name="Ground" id="r230" onChange={handlegender} value="230"/>
 <span>S-230</span>
 </label>
 </form> 
</div>
</div>

</div>
</div>
</div>
</div>
<div className="w-half px-3 lg:flex-none belo50">
<div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
<div className="relative h-full overflow-hidden bg-cover rounded-xl thisisbgcv">
<span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80 "></span>
<div className="relative z-10 flex flex-col flex-auto h-full p-4">
<h5 className="pt-2 mb-6 font-bold text-white">CEG Home</h5>
<p className="txtw ">You have selected room number {sroom}</p>
<div>
<div className='d-flex rdetails'>
  <p className='stdd'>Name : <span className='hstdd'>{sname}</span></p>
  <p className='stdd'>Hostel : <span className='hstdd'>Thamarai</span></p>
</div>
<div className='d-flex rdetails'>
  <p className='stdd'>Room no : <span className='hstdd'>{sroom}</span></p>
  <p className='stdd'>Floor : <span className='hstdd'>{sfloor}</span></p>
 
</div></div>
<div id='roombookingalert' className="p-3 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
Hello!
</div>
<form onSubmit={handle}>
 
 
    <input type="password" className="form-control" id="password" hidden value={sroom}/>
  
 
    <a className="mt-auto mb-0 font-semibold leading-normal text-white group text-sm" href="#" onClick={handle}>
Next
<i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200" aria-hidden="true"></i>
</a>
</form>


</div>
</div>
</div>
</div>
</div>
   </div>
   
 <div className="one third">
<div className="flex flex-wrap mt-6 -mx-3 thirdbloon">
<div className=" px-3 mt-0 mb-6 lg:mb-0 lg:flex-none panjwta">
<div className="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
<div className="flex-auto p-4">
<div className="py-4 pr-1 mb-4 bg-gradient-to-tl rounded-xl ">
<div className='blackbgp'>
<div className="smoky">
  <div className="d1"><img className='sm1 smdelay' src={smoke} alt="" />
  <img className='sm1 sm2 smdelay' src={smoke}alt="" />
  <img className='sm1 sm3 smdelay' src={smoke} alt="" /></div>
  <div className="d2"><img className='sm1' src={smoke} alt="" />
  <img className='sm1 sm2' src={smoke}alt="" />
  <img className='sm1 sm3' src={smoke} alt="" /></div>
  <div className="d3"><img className='sm1 smdelay2' src={smoke} alt="" />
  <img className='sm1 sm2 smdelay2' src={smoke}alt="" />
  <img className='sm1 sm3 smdelay2' src={smoke} alt="" /></div>
  <div className="d4"><img className='sm1 zsm' src={smoke} alt="" />
  <img className='sm1 sm2 zsm' src={smoke}alt="" />
  <img className='sm1 sm3 zsm' src={smoke} alt="" /></div>
  
</div>
</div>

</div>
<h6 className="mt-6 mb-0 ml-2">Mess Details</h6>
<p className="ml-2 leading-normal text-sm"><span className="font-bold">Active</span> from Jan 23,2023</p>
<div className="w-full px-6 mx-auto max-w-screen-2xl rounded-xl">
<div className="flex flex-wrap mt-0 -mx-3 flex-star">
<div className="flex-none w-1/4 max-w-full py-4 pl-0 pr-3 mt-0 koiv">
<div className="flex mb-2 wrapping">
<div className="flex items-center justify-center mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-purple-700 to-pink-500 text-neutral-900 wrem">
<FoodBankRoundedIcon sx={{ fontSize: 20,color:"white" }} />
</div>
<p className="mt-1 mb-0 font-semibold leading-tight text-xs">Last</p>
</div>
<h4 className="font-rs">&#8377;4K</h4>

</div>
<div className="flex-none w-1/4 max-w-full py-4 pl-0 pr-3 mt-0 koiv">
<div className="flex mb-2 wrapping">
<div className="flex items-center justify-center mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-blue-600 to-cyan-400 text-neutral-900 wrem">
<AccountBalanceWalletRoundedIcon sx={{ fontSize: 20,color:"white" }} />

</div>
<p className="mt-1 mb-0 font-semibold leading-tight text-xs">Used</p>
</div>
<h4 className="font-rs"> &#8377;14K</h4>

</div>
<div className="flex-none w-1/4 max-w-full py-4 pl-0 pr-3 mt-0 koiv">
<div className="flex mb-2 wrapping">
<div className="flex items-center justify-center mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-red-500 to-yellow-400 text-neutral-900 wrem">
<AccountBalanceRoundedIcon sx={{ fontSize: 20,color:"white" }} />

</div>
<p className="mt-1 mb-0 font-semibold leading-tight text-xs">Left</p>
</div>
<h4 className="font-rs">&#8377;10.5K</h4>

</div>
<div className="flex-none w-1/4 max-w-full py-4 pl-0 pr-3 mt-0 koiv">
<div className="flex mb-2 wrapping ">
<div className="flex items-center justify-center mr-2 text-center bg-center rounded fill-current shadow-soft-2xl bg-gradient-to-tl from-red-600 to-rose-400 text-neutral-900 wrem">
<PriceChangeRoundedIcon sx={{ fontSize: 20,color:"white" }} />

</div>
<p className="mt-1 mb-0 font-semibold leading-tight text-xs">Total</p>
</div>
<h4 className="font-rs">&#8377;24.5K</h4>

</div>
</div>
</div>
</div>
</div>
</div>
<div className="w-full max-w-full px-3 mt-0 lg:flex-none chewta">
<div className="border-black/12.5 shadow-soft-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border bdrbl">
<div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
<h4>Announcements</h4>

</div>
<div className="flex-auto p-4 thisisannounces">
<div>
<ul className='thisisul' id='ulof'>
  <li className='text-whit twl'>Mess Refund will given combined at the end of this semester</li>
  <li className='text-whit twl'>Attention Network Committee members, please be informed that we have a meeting scheduled for today at 5 pm. Kindly ensure that you arrive on time.</li>
  <li className='text-whit twl'>
    Students are requested to not to pluck flowers from garden.Dear students, Let's appreciate the beauty of nature without causing harm to it.
  </li>
  <li className='text-whit twl'>
  Attention all students! We're excited to announce the upcoming sports meet that will be held on the athletic grounds. More details will provided soon, Let's gear up and make this event a success!
  </li>
</ul>

</div>
</div>
</div>
</div>
</div>
  
</div> 
  
   </>
    
  )
}
