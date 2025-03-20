const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  files: [],
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadFileSuccess: (state, { payload }) => {
      state.files.push({
        _id: payload.id,
        fileName: payload.fileName,
      });
    },
    getFileListSuccess: (state, { payload }) => {
      state.files = payload;
    },
  },
});

export const { getFileListSuccess, uploadFileSuccess } = uploadSlice.actions;

const uploadSliceReducer = uploadSlice.reducer;
export default uploadSliceReducer;
