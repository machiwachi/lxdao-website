import React from 'react';
import { t } from '@lingui/macro';
import Mailchimp from 'react-mailchimp-form';

import Container from '@/components/Container';

export default function SectionMailchimp({ id, bgcolor }) {
  return (
    <Container>
      <Mailchimp
        action="https://lxdao.us12.list-manage.com/subscribe/post?u=4e96be73f764bc67c7f964f51&amp;id=eaa29be54b"
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true,
          },
        ]}
      />
    </Container>
  );
}
