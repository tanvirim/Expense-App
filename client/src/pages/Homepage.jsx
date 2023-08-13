/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Layout from "../components/layoyt/Layout";
import { message, Table } from "antd";
import Spinner from "../components/Spinner";
import { endpoint } from "../constants";
import axios from "axios";
import TransectionModal from "./TransectionModal";
import moment from "moment";
import FilterTransection from "../components/FilterTransection";

const Homepage = () => {
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

      <FilterTransection
        frequency={frequency}
        setFrequency={setFrequency}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

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
