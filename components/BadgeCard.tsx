import React from 'react';
import { Box, Link, Typography } from '@mui/material';

import Button from './Button';

type BadgeCardProps = {
  image: string;
  name: string;
  description: string;
  eligible: string;
  linkText: string;
  linkUrl: string;
};

const BadgeCard: React.FC<BadgeCardProps> = (props) => {
  const { image, name, description, eligible, linkText, linkUrl, ...rest } = props;
  return (
    <Box {...rest} display='flex' justifyContent='space-between' alignItems='center' sx={{position: 'relative', border: '0.5px solid #D0D5DD', borderRadius: '6px', padding: '27px'}}>
      <Box sx={{position: 'absolute', top: '-21px', left: '-21px'}} component={'img'} src={'/icons/badge-status.svg'}></Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Box component={'img'} src={image} height="124px" />
      </Box>
      <Box flex={1} display='flex' flexDirection='column' maxWidth='320px'>
        <Typography sx={{color: '#101828', fontWeight: 600, fontSize: '18px'}}>{name}</Typography>
        <Typography sx={{color: '#666F85', fontWeight: 400, fontSize: '16px'}}>{description}</Typography>
        <Typography sx={{color: '#666F85', fontWeight: 400, fontSize: '16px'}}>{eligible}</Typography>
      </Box>
      {linkText && linkUrl && 
        <Link href={linkUrl} target="_blank" sx={{textDecoration: 'none', display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
          <Button width="190px" variant='outlined'>{linkText}</Button>
      </Link>
      }
      {!linkText && !linkUrl &&
        <Box flex={1} />
      }
    </Box>
  );
};

export default BadgeCard;
