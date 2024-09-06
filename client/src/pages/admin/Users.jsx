import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table, Modal, message } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Show confirmation modal when Block button is clicked
  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Handle user deletion/blocking
  const handleBlockUser = async () => {
    try {
      const res = await axios.delete(
        `/api/v1/admin/deleteUser/${selectedUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setIsModalVisible(false); 
        getUsers(); 
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger"
          onClick={() => showModal(record)}
          >
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
      <Modal
        title="Confirm Block"
        visible={isModalVisible}
        onOk={handleBlockUser} 
        onCancel={() => setIsModalVisible(false)} 
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to block this user?</p>
      </Modal>
    </Layout>
  );
};

export default Users;
