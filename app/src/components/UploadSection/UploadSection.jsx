import axios from "axios";
import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";

const UploadSection = () => {
  const PostUrl = "http://localhost:4000/users/api/newsFeeds";
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleUploadClick = () => {
    document.getElementById("selectedFile").click();
  };

  const handleFileChange = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setUploadData((prevState) => ({
      ...prevState,
      image: file,
    }));
    openForm();
  };

  const openForm = () => {
    console.log("Form opened");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.post(PostUrl, uploadData);
    } catch (error) {}
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUploadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          width: "fit-content",
          border: "1px solid #808B96 ",
          borderRadius: "5px",
          padding: "30px",
          cursor: "pointer",
        }}
        onClick={handleUploadClick}
      >
        <div>
          Create <br /> Story
        </div>
        <div>
          <IoCloudUpload />
          <input
            type="file"
            id="selectedFile"
            style={{
              visibility: "hidden",
              width: "0px",
            }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      {uploadData.image && (
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={uploadData.title}
            onChange={handleInputChange}
            style={{
              borderRadius: "5px",
              padding: "5px",
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={uploadData.description}
            onChange={handleInputChange}
            style={{
              borderRadius: "5px",
              padding: "5px",
            }}
          ></textarea>
          <button
            type="submit"
            style={{
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadSection;
