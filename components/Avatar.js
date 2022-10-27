import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ImageUploading from 'react-images-uploading';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { convertIpfsGateway } from '../utils/utility';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import API from '@/common/API';

function Avatar(props) {
  const [value, setValue] = useState(props.value || '/images/placeholder.jpeg');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState();

  function onChange(imageList) {
    setImage(imageList[0].data_url);
    uploadImage(imageList[0].data_url);
  }

  async function uploadImage(imageUrl) {
    setUploading(true);
    const res = await API.post(`/upload/ipfs`, {
      imageDataUrl: imageUrl,
    });
    if (res.data.status === 'SUCCESS') {
      const url = convertIpfsGateway(res.data.data);
      setValue(url);
      props.onChange && props.onChange(url);
    } else {
      alert('Please Connect Wallet first.');
    }

    setUploading(false);
  }

  // useEffect(() => {
  //   const image = document.getElementById('image');
  //   const cropper = new Cropper(image, {
  //     aspectRatio: 16 / 9,
  //     crop(event) {
  //       console.log(event.detail.x);
  //       console.log(event.detail.y);
  //       console.log(event.detail.width);
  //       console.log(event.detail.height);
  //       console.log(event.detail.rotate);
  //       console.log(event.detail.scaleX);
  //       console.log(event.detail.scaleY);
  //     },
  //   });
  // }, []);

  return (
    <>
      <ImageUploading
        acceptType={['jpeg', 'png', 'jpg']}
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
                position="relative"
                sx={{
                  cursor: 'pointer',
                  border: '2px solid #ccc',
                  borderColor: props.error ? '#d32f2f' : '#ccc',
                }}
              >
                <img
                  src={uploading ? image : convertIpfsGateway(value)}
                  alt=""
                  width="100%"
                />
                {uploading && (
                  <Box
                    position="absolute"
                    top="0"
                    bottom="0"
                    right="0"
                    left="0"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="rgba(0,0,0,.5)"
                    zIndex="1"
                  >
                    <AutorenewIcon
                      sx={{
                        color: 'white',
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      }}
                      fontSize="large"
                    />
                  </Box>
                )}
              </Box>
            </Box>
          );
        }}
      </ImageUploading>
    </>
  );
}

export default Avatar;
