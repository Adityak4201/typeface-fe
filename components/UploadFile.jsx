"use client";

import React, { useState } from "react";

import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { uploadFileSuccess } from "@/redux/slices/uploadSlice";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadFile = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/upload",
        formData
      );

      dispatch(uploadFileSuccess(result.data.data));
    } catch (err) {
      setError(err?.response?.data?.message ?? "Something went wrong!!!");
    }
  };

  return (
    <>
      <h1 className="text-2xl mb-5 text-center">Upload File</h1>
      <div className="mb-5">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileUpload}
            multiple
          />
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {/* <button type="submit" className="py-2 px-10 bg-amber-400 rounded-xl" >Submit</button> */}
    </>
  );
};

export default UploadFile;
