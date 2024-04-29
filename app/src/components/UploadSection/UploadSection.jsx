import React from "react";
import { IoCloudUpload } from "react-icons/io5";

const UploadSection = () => {
  const handleUploadClick = () => {
    document.getElementById("selectedFile").click();
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
          />
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
