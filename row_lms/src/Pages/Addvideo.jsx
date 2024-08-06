import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import prev from '../img/generic-image-file-icon-hi.png'
import axios from 'axios';
import { useNavigate } from 'react-router';


function Addvideo() {

  
  let { changemenu } = useContext(mainContext);
  const [data, SetData] = useState({});
  const nav = useNavigate();

 
  const handleaddVideo = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5200/video/add_video',data);

      if (response.status !== 200) return alert('something went wrong');
      alert('data inserted successfully');
      console.log(response);
      nav('/viewvideo');
      
    } catch (error) {
      console.log(error);
      alert('somthing went wrong');  
    }
    
  };
 
  return (
    <div>

      <Header />

      <div className='flex  bg-[#F5F7FF]'>
        <Sidebar />

        <div className={` ${changemenu == true ? 'w-[95%]' : 'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

          <h1 className='text-[25px] font-[500] mb-[10px]'>
            Video
          </h1>
          <div className=''>
            <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
              <form action="" onSubmit={handleaddVideo}>
               
                Video Name
                <input type="text" onChange={(e) => { SetData({ ...data, videoname: e.target.value }) }} name='videotopic' className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 ' />
                Video Topic
                <input type="text" onChange={(e) => { SetData({ ...data, videotopic: e.target.value }) }} name='videotopic' className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 ' />
                Video Link
                <input type="text" onChange={(e) => { SetData({ ...data, videourl: e.target.value }) }} name='videourl' className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4' />

                Video Stauts
                <div className='flex items-center mt-5  mb-8 gap-2'>
                  <input type="radio" onChange={(e) => { SetData({ ...data, status: e.target.value }) }} name='status' value={true} className='mx-2 w-[20px] h-[20px] text-[20px]' /> Active
                  <input type="radio" onChange={(e) => { SetData({ ...data, status: e.target.value }) }} name='status' value={false} className='mx-2 w-[20px] h-[20px] text-[20px]' /> Deactive
                </div>

                <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
                <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>

    </div>
  )
}

export default Addvideo