import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';

function Viewuser() {
  let { changemenu } = useContext(mainContext);
  const [userData, setuserData] = useState([]);

  const getUser = async (req, res) => {
    try {
      const response = await axios.get('http://localhost:5200/user/read_user');
      setuserData(response.data.data);
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const handleDeleteUser = async (e) => {
    if (!window.confirm('Are you sure to delete')) return;
    
    try {
      const response = await axios.delete(`http://localhost:5200/user/delete_user/${e.target.value}`);
      
      if (response.status !== 200) return alert('something went wrong');
      alert('user deleted successfully');
      getUser();

    } catch (error) {
      console.log(error)
      alert('sometihng went wrong')

    }


  }


  return (
    <div>
      <Header />

      <div className='flex  bg-[#F5F7FF]'>
        <Sidebar />

        <div className={` ${changemenu === true ? 'w-[95%]' : 'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

          <h1 className='text-[25px] font-[500] mb-[10px]'>
            Welcome To Admin Panel
          </h1>
          <div className=''>
            <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
              <table >
                <tr>
                  <th>S.no</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
                {
                  userData.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td className='text-center'>
                          <button className='bg-green-500 text-white px-5 mr-5 py-1'>Edit</button>
                          <button className='bg-red-400 text-white px-5 py-1' value={user._id} onClick={handleDeleteUser}>Delete</button>
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

export default Viewuser