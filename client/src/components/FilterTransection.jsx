/* eslint-disable react/prop-types */
import { UnorderedListOutlined, AreaChartOutlined } from "@ant-design/icons";
import { Select, DatePicker } from "antd";
import { categories } from "../constants";

const FilterTransection = ({
  frequency,
  setFrequency,
  selectedDate,
  setSelectedDate,
  type,
  setType,
  category,
  setCategory,
  setshowModal,
  viewData,
  setViewData,
}) => {
  const { RangePicker } = DatePicker;
  return (
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
          {categories.map(category => <Select.Option value={category} key={category}> {category} </Select.Option>)}
        </Select>
      </div>

      <div className="d-flex switch-icons gap-3">
        <div className = {`mx-2 ${viewData==="table" ? "active-icon" : "inactive-icon"}`} >
          <UnorderedListOutlined onClick={() => setViewData("table")} />
        </div>
        <div className = {`mx-2 ${viewData==="analytic" ? "active-icon" : "inactive-icon"}`}>
          <AreaChartOutlined onClick={() => setViewData("analytic")} />
        </div>
      </div>

      <div>
        {" "}
        <button className="btn btn-primary" onClick={() => setshowModal(true)}>
          Add New
        </button>
      </div>
    </div>
  );
};

export default FilterTransection;
