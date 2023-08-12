/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Layout from "../components/layoyt/Layout";
import { Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import Spinner from "../components/Spinner";

const Homepage = () => {
  const [showModal, setshowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  
  

  const submitHandler = (values) => {
    setShowSpinner(true);
    console.log(values);
   
    
    
    setShowSpinner(false);
  };
  return (
    <Layout>
      <div className="filters">
        <div>Range Field</div>

        <div>
          {" "}
          <button
            className="btn btn-primary"
            onClick={() => setshowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

      <div className="content"></div>

      <Modal
       
        open={showModal}
        onCancel={() => setshowModal(false)}
        footer={false}
      >
        <Form onFinish={submitHandler}>
          <h1>Add Transaction</h1>
          {showSpinner && <Spinner />}

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Type is required" }]}
          >
            <Select placeholder="Select a type">
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select a category">
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Fee">Fee</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
              <Select.Option value="Transport">Transport</Select.Option>
              <Select.Option value="Grocery">Grocery</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Reference"
            name="reference"
            rules={[{ required: true, message: "Reference is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            initialValue={moment()}
            rules={[{ required: true, message: "Date is required" }]}
          >
            <DatePicker />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" onClick={() => setshowModal(false)}>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Homepage;
