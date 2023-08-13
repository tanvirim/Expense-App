/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Layout from "../components/layoyt/Layout";
import { message, Select, Table, DatePicker } from "antd";
import Spinner from "../components/Spinner";
import { endpoint } from "../constants";
import axios from "axios";
import TransectionModal from "./TransectionModal";
import moment from "moment";

const Homepage = () => {
  const { RangePicker } = DatePicker;
  const [showModal, setshowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [allTransections, setAllTransections] = useState([]);
  const [frequency, setFrequency] = useState("1");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>{moment(text).format("MMMM D, YYYY h:mm A")}</span>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Actions", dataIndex: "Actions", key: "Actions" },
  ];

  useEffect(() => {
    const getAlltransections = async () => {
      try {
        const { _id } = JSON.parse(localStorage.getItem("data"));
        setShowSpinner(true);
        const transections = await axios.post(
          endpoint + "/transections/get-transections",
          {
            userId: _id,
            frequency,
            selectedDate,
            type,
            category,
          }
        );

        setAllTransections(transections.data);

        setShowSpinner(false);
      } catch (error) {
        setShowSpinner(false);
        message.error("Fetch issue wiith transection");
      }
    };

    getAlltransections();
  }, [frequency, selectedDate, type, category]);

  const submitHandler = async (values) => {
    setShowSpinner(true);

    try {
      const { _id } = JSON.parse(localStorage.getItem("data"));
      setShowSpinner(true);
      await axios.post(endpoint + "/transections/add-transection", {
        ...values,
        userId: _id,
      });
      message.success("Transection Created Successfully");
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      message.error("Transection failed");
    }

    setShowSpinner(false);
  };

  return (
    <Layout>
      {showSpinner && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="1">Today </Select.Option>
            <Select.Option value="7">Last 7 Days </Select.Option>
            <Select.Option value="30"> Last 30 Days </Select.Option>
            <Select.Option value="365"> Last 365 Days </Select.Option>
            <Select.Option value="custom"> Custom </Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All </Select.Option>
            <Select.Option value="Income">Income</Select.Option>
            <Select.Option value="Expense"> Expense </Select.Option>
          </Select>
        </div>

        <div>
          <h6>Select Category</h6>
          <Select value={category} onChange={(values) => setCategory(values)}>
            <Select.Option value="all">All </Select.Option>
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
        </div>

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

      <div className="content">
        {allTransections.length > 0 ? (
          <Table columns={columns} dataSource={allTransections} />
        ) : (
          <p>No transactions available.</p>
        )}
      </div>

      <TransectionModal
        showModal={showModal}
        setshowModal={setshowModal}
        submitHandler={submitHandler}
        showSpinner={showSpinner}
      />
    </Layout>
  );
};

export default Homepage;
