import React from 'react';
import { t } from '@lingui/macro';

import Container from '@/components/Container';

const SectionVideo = () => (
  <Container title={t`lxdao-intro-video-title`}>
    <iframe
      width="750"
      height="440"
      src="https://www.youtube.com/embed/BshxCIjNEjY"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    ></iframe>
  </Container>
);

export default SectionVideo;
