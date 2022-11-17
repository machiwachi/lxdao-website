import React, { useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import ImageUploading from 'react-images-uploading';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { convertIpfsGateway } from '../utils/utility';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import API from '@/common/API';

function Avatar(props) {
  const [value, setValue] = useState(props.value || '/images/placeholder.jpeg');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);

  function onChange(imageList) {
    setImage(imageList[0].data_url);
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
  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        let fileUrls = '';
        window.URL.revokeObjectURL(fileUrls);
        fileUrls = window.URL.createObjectURL(blob);
        resolve({ url: fileUrls, blob, crop });
      }, 'image/jpeg');
    });
  }
  async function handleCompletedCrop(completedCrop) {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      const croppedImageUrl_ = await getCroppedImg(
        imgRef.current,
        completedCrop,
        'newFile.jpeg'
      );
      setCroppedImageUrl(croppedImageUrl_);
    }
  }
  function sureImg() {
    let reader = new FileReader();
    reader.readAsDataURL(croppedImageUrl.blob);
    reader.onloadend = function () {
      var base64String = reader.result;
      uploadImage(base64String);
      setImage('');
    };
  }
  return (
    <>
      <ImageUploading
        acceptType={['jpeg', 'png', 'jpg']}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({ onImageUpload }) => {
          return (
            <Box display="flex" gap={4}>
              <Box textAlign="center">
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
                    src={
                      croppedImageUrl
                        ? croppedImageUrl.url
                        : convertIpfsGateway(value)
                    }
                    alt="Crop"
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
                {image && croppedImageUrl && croppedImageUrl.url && (
                  <Button
                    variant="outlined"
                    aria-controls={open ? 'language-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={sureImg}
                    sx={{ marginTop: '16px' }}
                  >
                    确认
                  </Button>
                )}
              </Box>
              {!!image && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => handleCompletedCrop(c)}
                >
                  <img ref={imgRef} alt="Crop me" src={image} />
                </ReactCrop>
              )}
            </Box>
          );
        }}
      </ImageUploading>
    </>
  );
}

export default Avatar;
