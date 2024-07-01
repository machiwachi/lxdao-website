/* eslint-disable no-undef */
import React from 'react';

export default function Events() {
  return (
    <div>
      <h3>
        Subscribe calendar:{' '}
        <a
          href="https://calendar.google.com/calendar/u/0?cid=bHhkYW8ub2ZmaWNpYWxAZ21haWwuY29t"
          target="_blank"
          rel="noreferrer"
        >
          https://calendar.google.com/calendar/u/0?cid=bHhkYW8ub2ZmaWNpYWxAZ21haWwuY29t
        </a>
      </h3>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Antarctica%2FTroll&showTz=1&src=bHhkYW8ub2ZmaWNpYWxAZ21haWwuY29t&color=%23039BE5"
        style={{
          border: '0px #ffffff none',
        }}
        frameBorder="0"
        width="100%"
        height="900px"
        scrolling="no"
      ></iframe>
    </div>
  );
}
