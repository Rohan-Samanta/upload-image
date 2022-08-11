import { useState } from "react";
import "./App.css";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import Button from "@mui/material/Button";

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

function App() {
  const [image, setImage] = useState("");
  const [uploadImage, setUploadImage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleChange = async (e) => {
    // console.log(image);
    e.preventDefault();
    setIsImage(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tahdixwe");
    await axios
      .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData)
      .then((res) => {
        console.log(res);
        setUploadImage(res.data);
        setIsImage(false);
      })
      .catch((err) => setImageError(err.message));
  };
  // console.log(uploadImage);
  return (
    <div className="App">
      <h1>Upload Your Favorite Image</h1>
      <br />
      <form onSubmit={handleChange}>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{
            position: "relative",
            marginRight: "20px",
            width: "200px",
            padding: "8px",
            borderRadius: "15px",
            textAlign: "center",
            backgroundColor: "antiquewhite",
            color: "black",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
        />

        <Button type="submit" variant="contained" color="secondary">
          Upload
        </Button>
      </form>
      <br /> <br /> <br />
      {imageError}
      {isImage ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "130px",
          }}
        >
          <HashLoader color="#afd5d0" />
        </div>
      ) : (
        <>
          <img src={uploadImage.secure_url} style={{ height: "50vh" }} />
          <h3> {uploadImage.original_filename}</h3>
        </>
      )}
    </div>
  );
}

export default App;
