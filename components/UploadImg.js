import React, { useRef, useState } from 'react';
import { Box, Avatar, CircularProgress } from '@mui/material';
import API from '@/common/API';
import showMessage from '@/components/showMessage';
function UploadImg(props) {
  const { avatarValue, onChange } = props;
  const [loading, setLoading] = useState(false);
  const inputFile = useRef(null);
  const clickImg = () => {
    inputFile.current.click();
  };
  const uploadImgFn = async (file) => {
    setLoading(true);
    const formData = new FormData();
    Object.values(file.target.files).map((file) => {
      formData.append('files', file, file.name);
    });

    const result = await API.post('/upload-img', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setLoading(false);
    if (result.data.status_code == 200) {
      onChange(result.data.data[0].url);
    } else {
      showMessage({
        type: 'error',
        title: 'upload error',
      });
    }
  };
  return (
    <Box>
      <Avatar
        alt="avatar"
        src={!loading && avatarValue}
        onClick={clickImg}
        style={{
          cursor: 'pointer',
          width: '200px',
          height: '200px',
          border: '2px solid #ccc',
        }}
      >
        {loading && <CircularProgress color="inherit" />}
      </Avatar>
      <input
        type="file"
        name="files"
        multiple="multiple"
        style={{ display: 'none' }}
        ref={inputFile}
        onChange={uploadImgFn}
      />
    </Box>
  );
}

export default UploadImg;
