/* eslint-disable react/prop-types */
import { Modal, Form, Input, Select } from "antd";
import moment from "moment"
import Spinner from "../components/Spinner";
import { categories } from "../constants";
categories;

const TransectionModal = ({
  showModal,
  setshowModal,
  submitHandler,
  showSpinner,
  editable,
  
}) => {
  return (
    <Modal
      title={editable ? "Edit Transection" : "Add Transaction"}
      open={showModal}
      onCancel={() => setshowModal(false)}
      footer={false}
    >
      <Form 
      
      onFinish={submitHandler}
      initialValues={editable}
      >
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
            {categories.map((category) => (
              <Select.Option value={category} key={category}>
                {" "}
                {category}{" "}
              </Select.Option>
            ))}
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
          <Input type="date" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => setshowModal(false)}
          >
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default TransectionModal;
