import React, { useContext, useEffect } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import prev from '../img/generic-image-file-icon-hi.png'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { ToastContainer , toast } from 'react-toastify';

function Addteam() {
  const nav = useNavigate();
  const params = useParams();
  const [data,setData] = useState({});

  const fetchData = async (id)=>{

    const res = await axios.get(`http://localhost:5200/team/fetch_team_id/${id}`);

    const oldData = res.data.data;

    oldData.status = oldData.status.toString();
    setData(oldData);
  };


useEffect(()=>{

 if(params._id){
  fetchData(params._id);
 }
},[])

  let {changemenu} = useContext(mainContext);

  const handleAddTeam = async (e)=>{
    e.preventDefault();

    const teamform = e.target;
    const teamformData = new FormData(teamform);

    if(params._id){

      try{
        const response = await axios.put(`http://localhost:5200/team/update_team/${params._id}`,teamformData);

        if(response.status != 200) return toast.error("Something went wrong !");  

        nav('/viewcourse');

      }
      catch(error){
        toast.error("Error Notification !");  
      }
    }
    else{
  
      const response = await axios.post('http://localhost:5200/team/add_team',teamformData,{});
      // console.log(response);
  
      if (response.status != 200) return alert('something went wrong');
  
      nav('/viewteam')
  
      try{
  
      }
      catch(error){
        console.log(error);
        alert('something went wrong');
      }
    }
  };
  
  const [imgPrev, setImgPrev] = useState('');
  
  const handleImgPrev = (e)=>{
    const reader = new FileReader();


    const file = e.target.files[0];

    if(file){
      reader.readAsDataURL(file);
    }

    reader.onload = ()=>{
      setImgPrev(reader.result)
    }
  };

  const handleDataUpdate = (e)=>{
    const olddata = {...data};
    olddata[e.target.name] = e.target.value;

    setData(olddata);
  }
  return (
    <div>

<Header/>

<ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Team
        </h1>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px] '>
          <form action=""  onSubmit={handleAddTeam}>   
          Team Member Name
            <input type="text" value={data.teamname} onChange={handleDataUpdate} name='teamname' className='border border-gray-400 px-4 w-full h-[50px] mb-3 mt-2 '  />
            Category
            <input type="text" value={data.teamcategory} onChange={handleDataUpdate} name='teamcategory' className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 '  />
            Member Image
            <input type="file" onChange={handleImgPrev} name='thumbnail' id='file-input' className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
            <div className='flex items-center gap-0 mt-[80px]'>
              <div className='w-full flex items-center'>
            <input type="text" readOnly placeholder='Upload File' className=' px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]' />
            <label id="file-input-label" for="file-input" className='border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  '>Upload</label>
            </div>
            <div className=''>
            <img src={imgPrev || data.thumbnail || prev} alt="" width={150} />
            </div>
            </div>
           
            Slider Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input type="radio" value={true} name='status' onClick={handleDataUpdate}  checked={data.status == 'true'} className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Active
            <input type="radio" value={false} name='status' onClick={handleDataUpdate}  checked={data.status == 'false'} className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Deactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer/>
      </div>
    </div>

    </div>
  )
}

export default Addteam