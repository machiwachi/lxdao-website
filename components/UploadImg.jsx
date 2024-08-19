import React, { useRef, useState } from 'react';

import { Avatar, Box, CircularProgress } from '@mui/material';

import showMessage from '@/components/showMessage';

import API from '@/common/API';

function UploadImg(props) {
  const {
    avatarValue,
    onChange,
    width = '200px',
    height = '200px',
    borderRadius = 'full',
  } = props;
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
          width,
          height,
          border: '1px solid #ccc',
          borderRadius: borderRadius,
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
