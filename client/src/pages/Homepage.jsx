/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Layout from "../components/layoyt/Layout";
import { message, Table, Tooltip } from "antd";
import Spinner from "../components/Spinner";
import { endpoint } from "../constants";
import axios from "axios";
import TransectionModal from "./TransectionModal";
import moment from "moment";
import FilterTransection from "../components/FilterTransection";
import Analytics from "../components/layoyt/Analytics";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Homepage = () => {
  const [showModal, setshowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [allTransections, setAllTransections] = useState([]);
  const [frequency, setFrequency] = useState("1");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <Tooltip title="Edit">
            <EditOutlined
              onClick={() => {
                setEditable(record);
                setshowModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              className="mx-5"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

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

  useEffect(() => {
    getAlltransections();
  }, [frequency, selectedDate, type, category]);

  //submit modal
  const submitHandler = async (values) => {
    setShowSpinner(true);

    try {
      const { _id } = JSON.parse(localStorage.getItem("data"));
      setShowSpinner(true);
      if (editable) {
        await axios.put(endpoint + "/transections/edit-transection", {
          payload: {
            ...values,
            userId: _id,
          },
          transectionId: editable._id,
        });
        message.success("Transection updated Successfully");
        setShowSpinner(false);
        setshowModal(false);
        setEditable(null);
      } else {
        await axios.post(endpoint + "/transections/add-transection", {
          ...values,
          userId: _id,
        });

        message.success("Transection Created Successfully");
        setShowSpinner(false);
        setshowModal(false);
        setEditable(null);
      }
      setShowSpinner(false);
      setshowModal(false);
      setEditable(null);
    } catch (error) {
      setShowSpinner(false);
      message.error("Transection failed");
    }

    setShowSpinner(false);

    getAlltransections();
  };

  //delete handler
  const handleDelete = async (record) => {
    try {
      setShowSpinner(true);
      await axios.delete(endpoint + "/transections/delete-transection", {
        data: {
          transectionId: record._id,
        },
      });
      setShowSpinner(false);
      message.success("Transaction Deleted");
    } catch (error) {
      setShowSpinner(false);
      message.error("Delete failed");
    }
    getAlltransections();
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
        viewData={viewData}
        setViewData={setViewData}
        setshowModal={setshowModal}
      />

      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransections} />
        ) : (
          <Analytics allTransections={allTransections} />
        )}
      </div>

      <TransectionModal
        showModal={showModal}
        setshowModal={setshowModal}
        submitHandler={submitHandler}
        showSpinner={showSpinner}
        editable={editable}
        setEditable={setEditable}
      />
    </Layout>
  );
};

export default Homepage;
