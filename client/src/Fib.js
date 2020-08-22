import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePostValue } from "./useApi";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const [data, doLoad, loading] = usePostValue("/api/values");

  const fetchValues = async () => {
    const { data } = await axios.get("/api/values/current");
    setValues(data);
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get("/api/values/all");
    setSeenIndexes(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doLoad({ index });
    setIndex("");
    console.log(data);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button disabled={loading}>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
