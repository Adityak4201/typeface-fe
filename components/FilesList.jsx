"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getFileListSuccess } from "@/redux/slices/uploadSlice";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const FilesList = () => {
  const files = useSelector((state) => state.upload.files);

  const dispatch = useDispatch();

  const handleDownload = async (fileId) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/upload/" + fileId,
      { method: "GET" }
    );

    const url = URL.createObjectURL(await res.blob());

    window.open(url, "_blank").focus();
  };

  useEffect(() => {
    const getFiles = async () => {
      try {
        const result = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/api/upload",
          {}
        );

        dispatch(getFileListSuccess(result.data.files));
      } catch (err) {}
    };

    getFiles();
  }, []);

  return files?.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        {files.map((file) => (
          <TableRow key={file.fileName}>
            <TableCell>{file.fileName}</TableCell>
            <TableCell align="right">
              <button
                className="bg-amber-400 px-5 py-2 rounded-xl cursor-pointer"
                type="button"
                onClick={() => handleDownload(file._id)}
              >
                Download
              </button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  ) : null;
};

export default FilesList;
