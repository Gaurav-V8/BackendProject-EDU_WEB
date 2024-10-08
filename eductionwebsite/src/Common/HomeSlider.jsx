import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "./slider.css";
import axios from 'axios';

function HomeSlider() {
    const [slideData, setslideData] = useState([]);
    const [filePath, setfilePath] = useState('');

    const settings = {
        arrows:true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      const getSlides = async (req, res) => {
        const response = await axios.get('http://localhost:5200/slide/read_slide');
        setslideData(response.data.data);
        setfilePath(response.data.filePath);
        // console.log(response.data.data);
      };
      useEffect(() => {
        getSlides();
      }, []);
    

  return (
   <>
    
    <Slider {...settings} className='w-full h-full' >
        {
            slideData.length>0 ?

            slideData.map(v=>{
                // console.log(v.thumbnail)
                return (
                    <div >
                    <div style={{backgroundImage:`url('${filePath + v.thumbnail}')`}}  className={`relative h-[30vh] lg:h-[100vh] w-full  bg-cover bg-center`}>
                    <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full'>
                      <div className='w-full text-center lg:text-left lg:translate-y-[-50%]  lg:w-[50%] static text-white lg:border-blue-600 absolute lg:top-[50%] lg:left-[5%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]   py-4 lg:translate-y-[-50%] lg:translate-x-[0%]   lg:border-l-4 lg:pl-[50px] '>
                          <h1 className='lg:text-[60px] font-["Nunito"]'>{v.slidesheading} </h1>
                          <h2 className='lg:text-[60px] font-["Nunito"] font-bold'>{v.slidessubheading}</h2>
                      </div>
                    </div>
                </div>
                </div>
                )
            })
            :
            ""
        }
         
          
          
        </Slider>
   </>
  )
}

export default HomeSlider