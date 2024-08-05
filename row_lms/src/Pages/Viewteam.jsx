import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';




function Viewteam() {

  const nav = useNavigate();

  let {changemenu} = useContext(mainContext);

  const[teamData, setteamData] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [checked, setChecked] = useState([]);
  // console.log(teamData);

  const handleFetchTeam = async ()=> {
    try{

      const response = await axios.get('http://localhost:5200/team/read_teams');
      // console.log(response);
    
      if(response.status !== 200) return toast.error('something went wrong');

      setFilePath(response.data.filePath);    
      setteamData(response.data.data);
    }
    catch(error){
      toast.error("Error Notification !");  
    }
  };

  useEffect(()=>{handleFetchTeam()},[])

  const handleStatus = async (e)=>{

    const teamStatusData = {
      id:e.target.value,
      status:(e.target.textContent === 'Active') ? false: true
    }

    const response = await axios.put('http://localhost:5200/team/change_team_status',teamStatusData,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    handleFetchTeam();
    // console.log(response);
    // console.log(e.target.value,e.target.textContent)
   
  };

  
  const handleUpdate = (e) => {
    nav(`/addteam/${e.target.value}`);
  };

  const handleDelete = async (e) => {

    if (!window.confirm('Are you sure to delete')) return;


    try {
      const response = await axios.delete(`http://localhost:5200/team/delete_single_team/${e.target.value}`);
      console.log(response);
      if (response.status !== 200) return alert('Something went wrong');

      alert('Course deleted successfully');
      handleFetchTeam();
    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

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
    };

    const handleMultiDelete = async()=>{
      if (!window.confirm('Are you sure to delete')) return;
      try{
      
     const response = await axios.delete('http://localhost:5200/team/multi_delete', {data: checked}, {
        headers: {
          'Content-Type': 'application/json'
          }
          
      });
      if(response.status !== 200) return alert('Something went wrong');

      handleFetchTeam();
    }
    catch(error){
      alert('Something went wrong');
    }
      
    };

  
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
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Team Table
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
              <th>Member Name</th>
              <th>Category</th>
              <th>Member Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          {
            teamData.map((team, i)=>{
              return(
                <tr>
                <td>{i+1}</td>
                <td>
                  <input type="checkbox" onClick={handleCheckInput} value={team._id} />
                </td>
                <td>{team.teamname}</td>
                <td>{team.teamcategory}</td>
                <td>
                <img src={filePath +'/'+ team.thumbnail} className='w-[100px]' />
                </td>
                <td>
                   <button value={team._id} onClick={handleStatus} className={`p-[4px_8px] ${((team.status) ? 'bg-[green]' : 'bg-[red]')} rounded text-[white]`}>{(team.status) ? 'Active' : 'Inactive'}</button>
                </td>
                <td className='text-center'>
  
                <button  value={team._id} className='bg-green-500 text-white px-5 mr-5 py-1' onClick={handleUpdate}>Edit</button>
                <button value={team._id} className='bg-red-400 text-white px-5 py-1' onClick={handleDelete}>Delete</button>
  
  
                </td>
              </tr>
              )
            })
          }
           
          </table>
        </div>
        </div>
      <Footer/>
      </div>
    </div>

    </div>
  )
}

export default Viewteam