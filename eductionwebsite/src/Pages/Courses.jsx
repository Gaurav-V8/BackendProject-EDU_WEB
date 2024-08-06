import React, { useEffect, useState } from 'react'
import TitleSection from '../Common/TitleSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons'

import Header from '../Common/Header'
import axios from 'axios'
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";
import ReactPaginate from 'react-paginate';
import { CartContext } from './CartContext'
import { useContext } from 'react'

function Courses() {
  let [catelog, setcatelog] = useState('')
  let [search, setsearch] = useState('')
  let [faq, setFaq] = useState(false);

  const [courseData, setcourseData] = useState([]);
  const [filePath, setfilePath] = useState('');
  const { cartItems, setCartItems } = useContext(CartContext);

  const getCourses = async (req, res) => {
    try {
      const response = await axios.get('http://localhost:5200/course/read_courses');
      setcourseData(response.data.data);
      setfilePath(response.data.filePath);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);


  const handleAddToCart = async (e) => {

    const courseDetails = courseData.filter((item) => item._id === e.target.value);

    if (courseDetails.length === 0) {
      console.error('Course not found');
      return;
    }
    const PrdctObj = {
      id: courseDetails[0]._id,
      name: courseDetails[0].coursename,
      price: courseDetails[0].courseprice,
      image: courseDetails[0].thumbnail,
      quantity: 1,
    }
    const existingItem = cartItems.find((item) => item.id === PrdctObj.id);
    if (existingItem) {
      // If the item already exists in the cart, increment its quantity
      existingItem.quantity++;
      alert('course added in cart');
    } else {
      // If the item doesn't exist in the cart, add it
      setCartItems([...cartItems, PrdctObj]);
      alert('course added in cart');
    }

  };


  const [pageNumber, setPageNumber] = useState(0);

  const coursesPerPage = 6;
  const pagesVisited = pageNumber * coursesPerPage;

  const displayCourses = courseData
    .slice(pagesVisited, pagesVisited + coursesPerPage)
    .map((course, index) => (
      (
        <Card className="mt-6 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <img
              src={filePath + course.thumbnail}
              alt="thumbnail"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {course.coursename}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {course.courseprice}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
             Duration: {course.courseduration}
            </Typography>
            <Typography variant="h6" color="blue-gray" className="mb-2">
             Description: {course.coursedes}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleAddToCart} value={course._id} className='p-[10px_20px] bg-[blue] block'>Add To Cart</Button>
          </CardFooter>
        </Card>

      )
    ));

  const pageCount = Math.ceil(courseData.length / coursesPerPage);

  const changePage = ({ selected }) => {
    if (selected < 0 || selected >= pageCount) {
      console.error('Invalid page number');
      return;
    }
    setPageNumber(selected);
  };

  useEffect(() => {

    setcatelog("All")

  }, []);



  return (
    <>
      <Header />
      <TitleSection title={"Courses"} />
      <div className='max-w-[1300px] m-auto   mt-4 py-5'>
        <div className='grid grid-cols-[73%_auto] gap-4'>
          <div className=' py-5 px-4'>
            <form action="" >
              <div className='flex gap-4'>
                <div className='w-[25%]'>
                  <select name="" id="" onChange={(e) => setcatelog(e.target.value)} className='w-full h-[45px]  rounded-[3px] px-3 border border-[gray] text-[gray]'>
                    <option value="All">Select...</option>
                    <option value="Desgin">Desgin</option>
                    <option value="3D + Animation">3D + Animation</option>
                  </select>
                </div>
                <div className='w-[35%] flex items-center relative'>
                  <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} className='w-full h-[45px] rounded-[3px] px-3 border border-[gray] focus:outline-none ' placeholder='Search Our Course' />
                  <FontAwesomeIcon icon={faSearch} className='absolute text-[gray] text-[20px] top-[13px] right-[10px] z-[99]' />
                </div>
              </div>
            </form>

            <div className='grid grid-cols-2 gap-8 mt-[40px] d-flex'>
              {displayCourses}
            </div>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'paginationBttns bg-gradient-to-r from-light-blue-500 to-light-blue-500 py-1 px-4 rounded text-white font-bold hover:bg-blue-700'}
              previousLinkClassName={'previousBttn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
              nextLinkClassName={'nextBttn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'}
              disabledClassName={'bg-gray-300 text-gray-500 py-2 px-4 rounded'}
              activeClassName={'bg-green-500 text-white font-bold py-2 px-4 rounded'}
            />
          </div>
          <div className=' py-5 px-3'>
            <div className='faq border-[2px] rounded-[10px] py-6 '>
              <div onClick={() => setFaq(!faq)} className={`flex  justify-between items-center px-6`}>
                <h4 className='text-[20px] font-bold'>Category Filter</h4>
                <FontAwesomeIcon icon={faq !== true ? faAngleDown : faAngleUp} />
              </div>
              <ul className={`mx-[25px]   ${faq !== true ? "duration-[1s] mt-4 visible opacity-[1] max-h-[500px]" : "mt-0 duration-[1s] invisible opacity-0 max-h-[0]"} `}>
                <li className='mb-2 text-[20px]'>Desgin</li>
                <li className='mb-2 text-[20px]'>Desgin</li>
                <li className='mb-2 text-[20px]'>Desgin</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Courses