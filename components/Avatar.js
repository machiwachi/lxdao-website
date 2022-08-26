import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ImageUploading from 'react-images-uploading';

import API from '@/common/API';

function Avatar(props) {
  // value is a image url
  const [images, setImages] = useState([]);
  const [value, setValue] = useState(props.value || '/images/placeholder.jpeg');
  const [uploading, setUploading] = useState(false);
  console.log('uploading: ', uploading);

  function onChange(imageList) {
    console.log('imageList: ', imageList);
    setImages(imageList);
  }

  async function uploadImage() {
    setUploading(true);
    const res = await API.post(`/upload/ipfs`, {
      imageDataUrl: images[0].data_url,
    });
    if (res.data.status === 'SUCCESS') {
      const url = res.data.data;
      setValue(url);
      props.onChange && props.onChange(url);
      setImages([]);
    } else {
      alert('Please Connect Wallet first.');
    }

    setUploading(false);
  }

  return (
    <>
      <ImageUploading
        acceptType={['jpeg', 'png', 'jpg']}
        value={images}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => {
          return (
            <Box>
              <Box
                borderRadius="50%"
                overflow="hidden"
                width="150px"
                height="150px"
                onClick={onImageUpload}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <img src={value} alt="" width="100%" />
              </Box>
              {imageList.length > 0 && (
                <Typography marginTop={2} marginBottom={1}>
                  New Avatar
                </Typography>
              )}
              {imageList.map((image, index) => (
                <Box key={index}>
                  {uploading && 'uploading...'}
                  <Box
                    borderRadius="50%"
                    overflow="hidden"
                    width="150px"
                    height="150px"
                    onClick={onImageUpload}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <img src={image['data_url']} alt="" width="100%" />
                  </Box>

                  <Box marginTop={2}>
                    <Button onClick={uploadImage}>Confirm</Button>
                    <Button onClick={() => onImageUpdate(index)}>Change</Button>
                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          );
        }}
      </ImageUploading>
    </>
  );
}

export default Avatar;
