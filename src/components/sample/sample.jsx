import React, { useState, useEffect } from "react";

const Sample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace the URL with your API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxBXycNZ9gNGPQOuFH7x81skvrYcwCSYLkluJmmCqtfoV9j3KoCCBcDlagNd92jad7j-g/exec?action=getAllExpenses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>API Response</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Sample;

