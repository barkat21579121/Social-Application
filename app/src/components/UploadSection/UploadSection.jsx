import React, { useEffect, useState, useCallback } from "react";

const UploadSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        const response = await fetch(
          "http://localhost:4000/users/api/newsFeeds",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("Post uploaded successfully");
          setTitle("");
          setDescription("");
          setImage(null);
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    },
    [title, description, image]
  );

  useEffect(() => {
    const submitOnStateChange = async () => {
      if (title !== "" && description !== "" && image !== null) {
        try {
          await handleSubmit();
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
    };

    submitOnStateChange();
  }, [title, description, image, handleSubmit]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Upload Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          border: "1px solid black",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="title"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="image"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ display: "block" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadSection;
