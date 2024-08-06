import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

function AllTeam() {
    const [TeamData, setTeamData] = useState([]);
    const [filePath, setfilePath] = useState('');
    
    const getcourse = async (req, res) => {
        try {
            const response = await axios.get('http://localhost:5200/team/read_teams');
            setTeamData(response.data.data);
            setfilePath(response.data.filePath);
            console.log(response);

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getcourse();
    }, []);

    return (
        <>
            {
                TeamData.map(v => {
                    return (
                        <div className='w-full hover:shadow-lg duration-300 text-center border py-10 '>
                            <div className='w-[120px] m-auto  h-[120px] rounded-[50%] overflow-hidden'>
                                <img src={filePath + v.thumbnail} alt="" />

                            </div>
                            <h1 className='text-[19px] py-3'>{v.teamname}</h1>
                            <p>{v.teamcategory}</p>
                            <ul className='flex justify-center text-[13px] text-yellow-400 gap-2 mt-3 mb-2'>
                                <li><FontAwesomeIcon icon={faStar} /></li>
                                <li><FontAwesomeIcon icon={faStar} /></li>
                                <li><FontAwesomeIcon icon={faStar} /></li>
                                <li><FontAwesomeIcon icon={faStar} /></li>
                                <li><FontAwesomeIcon icon={faStar} /></li>

                            </ul>
                        </div>
                    )
                })
            }

        </>
    )
}

export default AllTeam