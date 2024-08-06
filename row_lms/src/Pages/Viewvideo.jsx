import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Viewvideo() {

  const nav = useNavigate();

  let { changemenu } = useContext(mainContext);
  const [videoData, setvideoData] = useState([]);
  const [filepath, setfilePath] = useState('');
  const [checked, setChecked] = useState([]);


  const handlefatchVideo = async (req, res) => {
    const response = await axios.get('http://localhost:5200/video/read_video');
    console.log( response);
    try {
      if (response.status !== 200) return alert('something went wrong');
      setfilePath(response.data.filePath);
      console.log(setfilePath);

      setvideoData(response.data.data);
      console.log(setvideoData);

    } catch (error) {
      console.log(error)

    }

  };
  useEffect(() => {
    handlefatchVideo();

  }, []);



  const handleStatus = async (e) => {
    const statusData = {
      id: e.target.value,
      status: (e.target.textContent === 'Active') ? false : true
    }

    const response = await axios.put('http://localhost:5200/video/change_video_status', statusData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    handlefatchVideo();
  };

  const handleUpdate = (e) => {
    nav(`/addvideo/${e.target.value}`);
  };



  const handleDelete = async (e) => {

    if (!window.confirm('Are you sure to delete')) return;


    try {
      const response = await axios.delete(`http://localhost:5200/video/delete_single_video/${e.target.value}`);
      console.log(response);
      if (response.status !== 200) return alert('Something went wrong');

      alert('Course deleted successfully');
      handlefatchVideo();
    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }



  const handleCheckInput = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    if (e.target.checked) {
      const newArr = [...checked, e.target.value];

      setChecked(newArr);
    }
    else{
      const newArr = [...checked];
      const currentIndex = newArr.findIndex((item)=> item === e.target.value);
      newArr.splice(currentIndex, 1);
      setChecked(newArr);
    }
    }

    const handleMultiDelete = async()=>{
      if (!window.confirm('Are you sure to delete')) return;
      try{
      
     const response = await axios.delete('http://localhost:5200/video/multi_delete', {data: checked}, {
        headers: {
          'Content-Type': 'application/json'
          }
          
      });
      if(response.status !== 200) return alert('Something went wrong');

      handlefatchVideo();
    }
    catch(error){
      alert('Something went wrong');
    }
      
    };


  return (
    <div>

      <Header />

      <div className='flex  bg-[#F5F7FF]'>
        <Sidebar />

        <div className={` ${changemenu == true ? 'w-[95%]' : 'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

          <h1 className='text-[25px] font-[500] mb-[10px]'>
            Welcome To Admin Panel
          </h1>
          <div className=''>
            <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
              <table >
                <tr>
                  <th>S.no</th>
                  <th>
                    <input type="checkbox" />
                    <button className='bg-[red] p-[6px_10px] rounded' onClick={handleMultiDelete}>Delete</button>
              </th>
                  <th>Video Name</th>
                  <th>Video Topic</th>
                  <th>Video </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {
                 videoData.map((video,index)=>{
                  return(
                    <tr>
                    <td>{index+1}</td>
                    <td>
                  <input type="checkbox" onClick={handleCheckInput} value={video._id} />
                </td>
                    <td>{video.videoname}</td>
                    <td>{video.videotopic}</td>
                    <td>{video.videourl}</td>
                    <td>
                   <button value={video._id} onClick={handleStatus} className={`p-[4px_8px] ${((video.status) ? 'bg-[green]' : 'bg-[red]')} rounded text-[white]`}>{(video.status) ? 'Active' : 'Inactive'}</button>
                </td>
                    <td className='text-center'>
                    <button  value={video._id} className='bg-green-500 text-white px-5 mr-5 py-1' onClick={handleUpdate}>Edit</button>
                    <button value={video._id} className='bg-red-400 text-white px-5 py-1' onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                  )
                 }) 
                }
               
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>

    </div>
  )
}

export default Viewvideo