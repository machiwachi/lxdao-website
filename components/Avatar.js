import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ImageUploading from 'react-images-uploading';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { convertIpfsGateway } from '../utils/utility';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview.tsx';
import 'react-image-crop/dist/ReactCrop.css';

import API from '@/common/API';
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function Avatar(props) {
  const [value, setValue] = useState(props.value || '/images/placeholder.jpeg');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState();

  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(undefined > 16 / 9);

  function onChange(imageList) {
    // setCrop(undefined);
    // const reader = new FileReader();
    // reader.addEventListener('load', () =>
    //   setImage(reader.result?.toString() || '')
    // );
    // reader.readAsDataURL(imageList[0]);

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

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );
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
              {!!image && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={image}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                    }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
              <div>
                {!!completedCrop && (
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: '1px solid black',
                      objectFit: 'contain',
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />
                )}
              </div>
            </Box>
          );
        }}
      </ImageUploading>
    </>
  );
}

export default Avatar;
