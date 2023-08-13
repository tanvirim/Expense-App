/* eslint-disable react/prop-types */

import { Select, DatePicker } from "antd";

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
        <button className="btn btn-primary" onClick={() => setshowModal(true)}>
          Add New
        </button>
      </div>
    </div>
  );
};

export default FilterTransection;
