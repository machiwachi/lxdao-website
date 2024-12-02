import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { TweetProps, useTweet } from 'react-tweet';
import { getTweet } from 'react-tweet/api';

import { Box, Link, Typography } from '@mui/material';

import Container from '@/components/Container';

export default function NewSectionConnections() {
  return (
    <Box
      sx={{
        width: '100vw',
        background: `#C6F5F1`,
        position: 'relative',
        pt: '80px',
        pb: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        width="430px"
        src="/images/new/white.png"
        sx={{
          position: 'absolute',
          top: '76px',
          right: '-40px',
        }}
      />
      <Box
        position="relative"
        fontSize={{ md: '40px', xs: '28px' }}
        textAlign="center"
        fontWeight="700"
        width="fit-content"
      >
        <Box
          component="img"
          src="/images/new/quote-right.svg"
          sx={{
            position: 'absolute',
            width: { md: '30px', xs: '20px' },
            left: { md: '-80px', xs: '-20px' },
          }}
        />
        Heart From <Box component="br" display={{ md: 'none', xs: 'block' }} />
        our community
        <Box
          component="img"
          src="/images/new/quote-left.svg"
          sx={{
            position: 'absolute',
            width: { md: '30px', xs: '20px' },
            top: { md: '40px', xs: '0px' },
            right: { md: '-90px', xs: '-20px' },
          }}
        />
      </Box>
      <Box
        width="100%"
        height="910px"
        sx={{
          overflow: 'scroll',
          top: '0',
          left: '0',
          mt: { md: '150px', xs: '30px' },
          ml: { xl: 'calc((100vw - Min(90vw, 1216px))/2)' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: { md: '37px', xs: '20px' },
            height: '910px',
            px: '20px',
            maxWidth: '1216px',
          }}
        >
          {xData.map((item, index) => (
            <TweetCard key={index} item={item} />
          ))}
        </Box>
      </Box>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            mt: '120px',
            width: '100%',
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { md: 'start', xs: 'center' },
          }}
        >
          <Box
            fontSize={{ md: '36px', xs: '28px' }}
            fontWeight="700"
            maxWidth={{ md: '280px', xs: '100%' }}
            textAlign={{ md: 'start', xs: 'center' }}
          >
            LXDAO Partners
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={{ md: '0px', xs: '20px' }}
            maxWidth={{ md: '800px', xs: '100%' }}
            justifyContent={{ md: 'end', xs: 'center' }}
          >
            {partnersData.map((partner, index) => {
              return (
                <Link href={partner.link} target="_blank" key={index}>
                  <Box component={'img'} src={partner.logo} />
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            mt: { md: '120px', xs: '60px' },
            width: '100%',
            justifyContent: { md: 'space-between', xs: 'center' },
            alignItems: { md: 'start', xs: 'center' },
          }}
        >
          <Box
            fontSize={{ md: '36px', xs: '28px' }}
            fontWeight="700"
            maxWidth={{ md: '280px', xs: '100%' }}
            textAlign={{ md: 'start', xs: 'center' }}
          >
            Beloved Sponsors
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={{ md: '0px', xs: '20px' }}
            maxWidth={{ md: '800px', xs: '100%' }}
            justifyContent={{ md: 'end', xs: 'center' }}
          >
            {sponsorshipsData.map((partner, index) => {
              return (
                <Link href={partner.link} target="_blank" key={index}>
                  <Box component={'img'} src={partner.logo} />
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { md: '96px', xs: '20px' },
            mt: { md: '120px', xs: '60px' },
            maxWidth: '1218px',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(135deg, #2975DF 0%, #32A5E1 50%, #3ACFE3 100%)',
            borderRadius: '24px',
            padding: { md: '120px 100px', xs: '60px 40px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { md: '48px', xs: '32px' },
              fontWeight: '700',
              color: 'white',
            }}
          >
            Support LXDAO
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography color="white" maxWidth="420px">
              The problem we try to tackle at LXDAO requires long-term
              endeavors. We have been here for two years, yet still need support
              for the future works to happen.
              <br />
              <br />
              If you agree with our ideas, please support us for a longer
              runway.
            </Typography>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '24px',
                width: '240px',
                mt: { md: '0px', xs: '40px' },
                height: 'fit-content',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '6px',
                  textAlign: 'center',
                  py: '18px',
                  bgcolor: 'white',
                  width: '240px',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  backgroundImage:
                    'linear-gradient(to right, #2975DF, #32A5E1, #3ACFE3)',
                }}
              >
                <Box
                  sx={{
                    fontSize: '22px',
                    fontWeight: 700,
                    py: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.open(
                      'https://mirror.xyz/lxdao.eth/H7v4nkLRr7N2CfMi7zGUOH0CU7r-MHh8pBcrGUtxRIw',
                      '_blank'
                    );
                  }}
                >
                  Support Guide
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TweetCard({ item }) {
  return (
    <Box
      width="280px"
      sx={{
        p: '47px 34px',
        background: 'white',
        borderRadius: '20px',
        zIndex: 100,
        cursor: 'pointer',
      }}
      onClick={() => {
        window.open(`https://x.com/x/status/${item.id}`, '_blank');
      }}
    >
      <Box
        sx={{
          wordWrap: 'break-word',
        }}
      >
        {item?.text}
      </Box>
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
          component="img"
          src={item?.profile}
          sx={{
            borderRadius: '50%',
          }}
        ></Box>
        <Box>
          <Box>{item?.user_name}</Box>
          <Box
            sx={{
              fontSize: '12px',
            }}
          >
            @{item?.user_handler}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const sponsorshipsData = [
  {
    name: 'Mask Network',
    logo: '/images/partners/mask-logo.svg',
    link: '	https://mask.io/',
  },
  {
    name: 'Optimism',
    logo: '/images/partners/optimism-logo.svg',
    link: 'https://www.optimism.io/',
  },
];

const partnersData = [
  {
    name: 'NextDAO',
    logo: '/images/partners/nextdao-logo.svg',
    link: 'https://twitter.com/theNextDAO',
  },
  {
    name: 'GCC',
    logo: '/images/partners/gcc-logo.svg',
    link: 'https://www.gccofficial.org/',
  },
  {
    name: 'PlanckerDAO',
    logo: '/images/partners/Plancker-logo.svg',
    link: 'https://plancker.org/',
  },
  {
    name: 'DAOStar',
    logo: '/images/partners/DAOStar-logo.svg',
    link: 'https://daostar.org/',
  },
  {
    name: 'MoleDAO',
    logo: '/images/partners/moledao-logo.svg',
    link: 'https://linktr.ee/moledao',
  },
  {
    name: 'MarsDAO',
    logo: '/images/partners/marsdao-logo.svg',
    link: 'https://linktr.ee/MarsDAO',
  },
  {
    name: 'EthSign',
    logo: '/images/partners/ethsign-logo.svg',
    link: 'https://linktr.ee/SignProtocol',
  },
  {
    name: '8dao',
    logo: '/images/partners/8dao-logo.svg',
    link: 'https://8dao.io/',
  },
  {
    name: 'Uncommons',
    logo: '/images/partners/Uncommons-logo.svg',
    link: 'https://www.notion.so/Uncommons-04ea0224d3cd4fe9b5181b6dd22d02b4',
  },
  {
    name: 'AAStar',
    logo: '/images/partners/AAStar-logo.svg',
    link: 'https://www.aastar.xyz/',
  },
  {
    name: 'Eleduck',
    logo: '/images/partners/eleduck-logo.svg',
    link: 'https://eleduck.com/',
  },
  {
    name: 'Artele',
    logo: '/images/partners/Artela-logo.svg',
    link: 'https://artela.network/',
  },
  {
    name: 'DMC',
    logo: '/images/partners/DMC-logo.svg',
    link: 'https://www.dmctech.io/en',
  },
  {
    name: 'ETHPanda',
    logo: '/images/partners/ETHPanda-logo.svg',
    link: 'https://ethpanda.org/',
  },
  {
    name: 'BlockBooster',
    logo: '/images/partners/BlockBooster-logo.svg',
    link: 'https://www.gitcoin.co/',
  },
];

const xId = [
  '1731662536435716572',
  '1653387127009452032',
  '1844410013919612973',
  '1775069684385366026',
  '1797864398624837718',
  '1797801153650180421',
  '1753329682463015177',
  '1669273384121946113',
  '1772257636224032817',
  '1642840135753687041',
];
const xData = [
  {
    id: '1731662536435716572',
    text: '队形是LX,代表着良心,代表着领先😎\n今天的周一测试活动非常成功,实现了区块链历史上第一次Full…团建，来自@LXDAO_Official 家人们！ https://t.co/UhNYWvJBUH',
    profile:
      'https://pbs.twimg.com/profile_images/1695122503369375744/rTyQ72_p_normal.jpg',
    user_name: 'lidamao.eth ( 本升专导师 )',
    user_handler: 'BestLidamao',
  },
  {
    id: '1653387127009452032',
    text: 'LXDAO was founded by a group of Asian Developers, who are problem-solving oriented',
    profile:
      'https://pbs.twimg.com/profile_images/1573142830133874689/CDce98AK_normal.png',
    user_name: 'Jayden Wei',
    user_handler: 'jaydenw3i',
  },
  {
    id: '1844410013919612973',
    text: 'Open-source thrives on the passion of its community. At Artela, we’re proud to be community-driven, putting our builders first. Today, we celebrate those who tirelessly shape our ecosystem! 🚀💡 Featuring @LXDAO_Official @TradeOnArtemis and @artexswap',
    profile:
      'https://pbs.twimg.com/profile_images/1786260022676324353/q9a40NSw_normal.png',
    user_name: 'Artela',
    user_handler: 'Artela_Network',
  },
  {
    id: '1775069684385366026',
    text: "🌟 We're thrilled to share that we've formed a strategic partnership with @LXDAO_Official, a leading developer-focused community dedicated to sustainably supporting valuable Web3 public goods and open-source projects.",
    profile:
      'https://pbs.twimg.com/profile_images/1786260022676324353/q9a40NSw_normal.png',
    user_name: 'Artela',
    user_handler: 'Artela_Network',
  },
  {
    id: '1797864398624837718',
    text: '祝贺@LXDAO_Official 和@brucexu_eth 以及所有为了公共物品奉献的朋友们，两周年快乐！',
    profile:
      'https://pbs.twimg.com/profile_images/1753136367763398656/HWtghbrf_normal.jpg',
    user_name: 'Victor Zhou🍊🛡️Namefi.io',
    user_handler: 'ZainanZhou',
  },
  {
    id: '1797801153650180421',
    text: '🔥很高兴见证 @LXDAO_Official  成立两年来的快速发展。LXDAO 一直致力于支持中…物品发展。期待 BuidlerDAO 与 LXDAO 继续深化合作，共同推动 Web3 行业繁荣！',
    profile:
      'https://pbs.twimg.com/profile_images/1683519202915917824/_fkeg3QZ_normal.jpg',
    user_name: 'BuidlerDAO',
    user_handler: 'BuidlerDAO',
  },
  {
    id: '1753329682463015177',
    text: '17. 开发者社区：@OpenBuildxyz、@RebaseCommunity、@LXDAO_Of…社区，分享技术知识，常有公开课分享。\n@Dapp_Learning 是专注于以太坊开源开发者社区。',
    profile:
      'https://pbs.twimg.com/profile_images/1506109203953651717/4CXSukXE_normal.jpg',
    user_name: 'PlanckerDAO',
    user_handler: 'PlanckerDAO',
  },
  {
    id: '1669273384121946113',
    text: 'Glad to see over 30 buidlers got their rewards from LXDAO last month!\nMore decentralized and more people joining us for supporting Web3 Public Goods!\nThe only sad thing is cost ~50u gas fee🥺 https://app.safe.global/transactions/history?safe=eth:0xB45e9F74D0a35fE1aa0B78feA03877EF96ae8dd2',
    profile:
      'https://pbs.twimg.com/profile_images/1559299527135227905/Fo3pqrYX_normal.jpg',
    user_name: 'brucexu.eth ❤️🐼🦇🔊',
    user_handler: 'brucexu_eth',
  },
  {
    id: '1772257636224032817',
    text: '何为public goods：GCC《Web3公共物品生态研究报告》总结\n作者： @HYbigbos…b3公共物品的研究成果中，最有参考价值的资料之一。 https://t.co/ccx2n1mjTJ',
    profile:
      'https://pbs.twimg.com/profile_images/1706281072496160768/Ynv1yPW3_normal.jpg',
    user_name: '极客Web3 (GeeksWeb3)',
    user_handler: 'geeksweb3',
  },
  {
    id: '1774682198949732487',
    text: 'LXDAO is the best Web3 DAO. Our mission is to make it easier for more people to enter Web3 and understand Crypto knowledge. Welcome to join us!',
    profile:
      'https://pbs.twimg.com/profile_images/1795003391275618304/W-F7vstn_400x400.jpg',
    user_name: 'TYYYT',
    user_handler: 'wutaner',
  },
];
