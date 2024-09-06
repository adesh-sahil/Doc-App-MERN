// client/src/pages/user/UserProfile.jsx

import React from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, Button, Divider, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { message } from "antd";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/updateProfile",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Profile updated successfully!");
      } else {
        message.error("Failed to update profile.");
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center">User Profile</h1>
        <Divider />
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Personal Details" key="1">
            <Form
              layout="vertical"
              onFinish={handleFinish}
              initialValues={{ ...user }}
              className="m-3"
            >
              <Row gutter={20}>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Name" name="name" required>
                    <Input placeholder="Your first name" />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Last Name" name="lastName" required>
                    <Input placeholder="Your last name" />
                  </Form.Item>
                </Col> */}
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Email" name="email" required>
                    <Input placeholder="Your email address" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input placeholder="Your phone number" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={8}>
                  <Form.Item label="Address" name="address">
                    <Input placeholder="Your address" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Account Settings" key="2">
            <div className="m-3">
              <h3>Account Preferences</h3>
              <p>Manage your account settings and preferences here.</p>
              {/* Add more settings-related fields or content here */}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
