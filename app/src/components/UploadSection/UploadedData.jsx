import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const UploadedData = () => {
  const [data, setData] = useState([]);
  const Url = "http://localhost:4000/users/api/getNewsFeedData";

  const getUserNewsFeed = async () => {
    axios
      .get(Url)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserNewsFeed();
  }, []);
  return (
    <div>
      {data &&
        data?.map((item) => {
          return (
            <>
              <div key={item.id}>
                <div>
                  {" "}
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                  <img
                    src={"http://localhost:4000" + item.imagePath}
                    alt="loading..."
                  />
                  {console.log(`http://localhost:4000/${item.imagePath}`)}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default UploadedData;
