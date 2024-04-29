import React, { useState } from "react";
import axios from "axios";
import gif from "../../components/assests/200w.gif";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("username");

  const useOpenApi = async () => {
    setLoading(true);
    alert(`Hello ${userName} press Ok`);
    try {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=search+terms"
      );
      setData(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button onClick={useOpenApi} className="store-btn">
            Open Store
          </button>
          <button className="store-btn" onClick={() => Navigate("/NewsFeed")}>
            News Feeds
          </button>
        </div>
      </div>
      {loading ? (
        <img src={gif} alt="Loading..." />
      ) : (
        <div className="books">
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "20px",
              }}
            >
              <img
                src={item.volumeInfo.imageLinks?.smallThumbnail}
                alt="load"
                style={{
                  maxWidth: "100px",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              />
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {item.volumeInfo.authors}
              </p>
              <p style={{ marginBottom: "10px" }}>
                {item.volumeInfo.description}
              </p>
              <button
                style={{
                  opacity: "0.6",
                  cursor: "not-allowed",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "5px 10px",
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
