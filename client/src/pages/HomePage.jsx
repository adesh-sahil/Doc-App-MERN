import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';


const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if(res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, [])
  return (
    <Layout>
      <DoctorList  doctors={doctors}/>
    </Layout>
  )
}

export default HomePage;