import React, { useState, useEffect } from "react";
import { Delete } from "lucide-react";

const Formfield = () => {
  const [inputData, setInputData] = useState({
    candidatename: "",
    age: "",
    dob: "",
    email: "",
  });
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("formData"));
    setAllData(data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputData({
      candidatename: "",
      age: "",
      dob: "",
      email: "",
    });

    let existingData = JSON.parse(localStorage.getItem("formData"));
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    const newData = { ...inputData };
    const updatedData = [...existingData, newData];
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setAllData(updatedData);
  };

  const deleteClick = (index) => {
    let updatedData = [...allData]; // Create a copy of allData
    updatedData.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("formData", JSON.stringify(updatedData));

    // Update the allData state to reflect the deletion
    setAllData(updatedData);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-3xl w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3 items-center"
        >
          <div className="w-full flex gap-2 items-center">
            <input
              type="text"
              name="candidatename"
              value={inputData.candidatename}
              className="border-2 border-blue-500 outline-none rounded-lg p-2 flex-1"
              onChange={handleChange}
            />
            <input
              type="text"
              name="age"
              value={inputData.age}
              className="border-2 border-blue-500 outline-none rounded-lg p-2 flex-1"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex gap-2 items-center">
            <input
              type="date"
              name="dob"
              value={inputData.dob}
              className="border-2 border-blue-500 outline-none rounded-lg p-2 flex-1"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              value={inputData.email}
              className="border-2 border-blue-500 outline-none rounded-lg p-2 flex-1"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 text-white w-28 p-3"
          >
            Add
          </button>
        </form>
        <div className="mt-10 w-full">
          <table className="w-full">
            <thead>
              <tr className="border-2 border-blue-500">
                <td className="px-2 py-3">name</td>
                <td className="px-2 py-3">age</td>
                <td className="px-2 py-3">dob</td>
                <td className="px-2 py-3">email</td>
                <td className="px-2 py-3"></td>
              </tr>
            </thead>
            <tbody>
              {allData.map((data, index) => (
                <tr key={data.candidatename + index}>
                  <td className="px-2 py-3">{data.candidatename}</td>
                  <td className="px-2 py-3">{data.age}</td>
                  <td className="px-2 py-3">{data.dob}</td>
                  <td className="px-2 py-3">{data.email}</td>
                  <td className="px-2 py-3">
                    <Delete
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteClick(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Formfield;
