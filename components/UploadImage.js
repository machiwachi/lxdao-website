import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Uploader3 } from '@lxdao/uploader3';
import { Img3 } from '@lxdao/img3';
import { getLocalStorage } from '@/utils/utility';

function uploadImage(props) {
  const [file, setFile] = useState();

  const { uploaderWidth, uploaderHeight } = props;

  const accessToken = getLocalStorage('accessToken');

  const Status = (props) => {
    const { children } = props;
    return (
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        {children}
      </div>
    );
  };

  const PreviewFile = (props) => {
    const { file } = props;

    let src;
    if (file.status === 'uploading') {
      src = file.thumbData || file.imageData;
    } else if (file.status === 'done') {
      src = file.url;
    } else if (file.status === 'cropped') {
      src = file.thumbData;
    } else {
      src = file.previewUrl;
    }

    return (
      <>
        <Img3
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          src={src || '/images/placeholder.jpeg'}
          alt={file.name}
          timeout={3000}
        />
        {file.status === 'uploading' && (
          <Status>
            <Icon
              icon={'line-md:uploading-loop'}
              color={'#65a2fa'}
              fontSize={40}
            />
          </Status>
        )}
        {file.status === 'error' && (
          <Status>
            <Icon
              icon={'iconoir:cloud-error'}
              color={'#ffb7b7'}
              fontSize={40}
            />
          </Status>
        )}
      </>
    );
  };

  const PreviewWrapper = (props) => {
    const { children, style, ...rest } = props;
    return (
      <div
        {...rest}
        style={{
          width: 200,
          height: 200 * 0.75,
          backgroundColor: '#ffffff',
          color: '#333',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '0.5px solid #fff',
          position: 'relative',
          marginRight: 10,
          marginBottom: 10,
          ...style,
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      <Uploader3
        api={`${
          process.env.NEXT_PUBLIC_LXDAO_BACKEND_API
        }/upload/ipfs/?imageDataUrl=${file ? file[0] : ''}`}
        headers={{
          Authorization: `Bearer ${accessToken}`,
        }}
        multiple={false}
        crop={true}
        responseFormat={(resData) => {
          return { url: resData?.data?.url };
        }}
        onChange={(files) => {
          setFile(files[0]);
        }}
        onUpload={(file) => {
          setFile(file);
        }}
        onComplete={(file) => {
          setFile(file);
          props.onChange(file?.url);
        }}
        onCropCancel={(file) => {
          setFile(null);
        }}
        onCropEnd={(file) => {
          setFile(file);
        }}
      >
        <PreviewWrapper
          style={{
            height: uploaderHeight,
            width: uploaderWidth,
            border: '0.5px solid #dddddd',
            overflow: 'hidden',
          }}
        >
          {file ? (
            <PreviewFile file={file} />
          ) : props.imageValue ? (
            <Img3
              style={{ width: uploaderWidth, height: uploaderHeight }}
              src={props.imageValue}
            />
          ) : (
            <div style={{ fontSize: '30px', color: '#dddddd' }}>+</div>
          )}
        </PreviewWrapper>
      </Uploader3>
    </>
  );
}

export default uploadImage;
