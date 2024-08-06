import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Viewslider() {
  let {changemenu} = useContext(mainContext);

  const nav = useNavigate();

  const [slideData, setSlideData] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [checked, setChecked] = useState([]);

  const handleFetchSlide = async () => {
    try {

      const response = await axios.get('http://localhost:5200/slide/read_slide');

      if (response.status !== 200) return alert('Something went wrong');

      setFilePath(response.data.filePath);

      setSlideData(response.data.data);

    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => { handleFetchSlide() }, []);


  const handleStatus = async (e) => {
    const statusData = {
      id: e.target.value,
      status: (e.target.textContent === 'Active') ? false : true
    }

    const response = await axios.put('http://localhost:5200/slide/change_slide_status', statusData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    handleFetchSlide();
  };

  const handleUpdate = (e) => {
    nav(`/Addslider/${e.target.value}`);
  };



  const handleDelete = async (e) => {

    if (!window.confirm('Are you sure to delete')) return;


    try {
      const response = await axios.delete(`http://localhost:5200/slide/delete_single_slide/${e.target.value}`);
      console.log(response);
      if (response.status !== 200) return alert('Something went wrong');

      alert('Slide deleted successfully');
      handleFetchSlide();
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
      
     const response = await axios.delete('http://localhost:5200/slide/multi_delete', {data: checked}, {
        headers: {
          'Content-Type': 'application/json'
          }
          
      });
      if(response.status !== 200) return alert('Something went wrong');

      handleFetchSlide();
    }
    catch(error){
      alert('Something went wrong');
    }
      
    };


  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
       Slider Table
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
              <th>Slider Heading</th>
              <th>Slider sub-heading</th>
              <th>Slider Description</th>
              <th>Slider Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

             {
                  slideData.map((slide, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <input type="checkbox" onClick={handleCheckInput} value={slide._id} />
                        </td>
                        <td>{slide.slideheading}</td>
                        <td>{slide.slideSubheading}</td>
                        <td>{slide.slidedes}</td>
                        <td>
                          <img src={filePath +'/'+ slide.thumbnail} className='w-[100px]' />
                        </td>
                        <td>
                          <button value={slide._id} onClick={handleStatus} className={`p-[4px_8px] ${((slide.status) ? 'bg-[green]' : 'bg-[red]')} rounded text-[white]`}>{(slide.status) ? 'Active' : 'Inactive'}</button>

                        </td>
                        <td className='text-center'>

                          <button value={slide._id} className='bg-green-500 text-white px-5 mr-5 py-1' onClick={handleUpdate}>Edit</button>
                          <button value={slide._id} className='bg-red-400 text-white px-5 py-1' onClick={handleDelete}>Delete</button>


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

export default Viewslider