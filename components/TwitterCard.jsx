import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { getTweet } from 'react-tweet/api';

import { Box, Link, Typography } from '@mui/material';

export default function TweetCard({ id }) {
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    console.log('id', id);
    getTweet(id).then(setTweet);
  }, [id]);

  if (!tweet) {
    return <>NotFound</>;
  }

  return (
    <Box
      width="280px"
      sx={{
        p: '47px 34px',
        background: 'white',
        borderRadius: '20px',
        zIndex: 100,
      }}
      onClick={() => {
        window.open(tweet.url, '_blank');
      }}
    >
      <Box>{tweet.text}</Box>
      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          mt: '48px',
        }}
      >
        <Box
          width="40px"
          height="40px"
          sx={{
            borderRadius: '50%',
            background: `url(${tweet.author.profile_image_url})`,
          }}
        ></Box>
        <Box>
          <Box>{tweet.author.name}</Box>
          <Box
            sx={{
              fontSize: '12px',
            }}
          >
            @{tweet.author.username}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  return { props: { id } };
}
