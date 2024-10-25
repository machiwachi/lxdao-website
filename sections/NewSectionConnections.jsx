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
          }}
        >
          {xId.map((id, index) => (
            <TweetCard key={index} id={id} />
          ))}
          {/* <Tweet width="100px" id="1628832338187636740" />
          {testimonials.map(
            ({ content, name, handler, avatar, link }, index) => (
              <Box
                key={index}
                width="280px"
                sx={{
                  p: '47px 34px',
                  background: 'white',
                  borderRadius: '20px',
                  zIndex: 100,
                }}
                onClick={() => {
                  window.open(link, '_blank');
                }}
              >
                <Box>{content}</Box>
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
                      background: `url(${avatar})`,
                    }}
                  ></Box>
                  <Box>
                    <Box>{name}</Box>
                    <Box
                      sx={{
                        fontSize: '12px',
                      }}
                    >
                      @{handler}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          )} */}
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
                  }}
                >
                  Support Guide
                </Box>
                <Box
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {'Notion ->'}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TweetCard({ id }) {
  const { data: tweet, error, isLoading } = useTweet(id);
  if (isLoading) return <></>;
  console.log('tweet', tweet);

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
          component="img"
          src={tweet.user.profile_image_url_https}
          sx={{
            borderRadius: '50%',
          }}
        ></Box>
        <Box>
          <Box>{tweet.user.name}</Box>
          <Box
            sx={{
              fontSize: '12px',
            }}
          >
            @{tweet.user.screen_name}
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
  '1631840755982675969',
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

const testimonials = [
  {
    content: `这段时间恰好在和朋友们聊华语的开发者社区，给大家推荐在我心目中认可的且我可背书的三个组织. @LXDAO_Official \n

技术氛围浓厚+去中心化程度高+工程化能力强可落地
现在基本上我周围有在做项目或者想参与开发者社区的我都会推荐他们去LXDAO，属于踏实做事不重营销`,
    name: '陈剑Jason 🐡',
    handler: 'jason_chen998',
    avatar: 'https://x.com/jason_chen998/photo',
    link: 'https://x.com/jason_chen998/status/1631840755982675969',
  },
  {
    content: `队形是LX,代表着良心,代表着领先

今天的周一测试活动非常成功,实现了区块链历史上第一次Fully on chain 团建，来 @LXDAO_Official

家人们！`,
    name: 'lidamao',
    handler: 'BestLidamao',
    avatar: 'https://x.com/BestLidamao/photo',
    link: 'https://x.com/BestLidamao/status/1731662536435716572',
  },
  {
    content: `LXDAO was founded by a group of Asian Developers, who are problem-solving oriented`,
    name: 'JayDen Wei',
    handler: 'jaydenw3i',
    avatar: 'https://x.com/jaydenw3i/photo',
    link: 'https://x.com/jaydenw3i/status/1653387127009452032',
  },
  {
    content: `Open-source thrives on the passion of its community. At Artela, we’re proud to be community-driven, putting our builders first. Today, we celebrate those who tirelessly shape our ecosystem!Featuring @LXDAO_Official @TradeOnArtemis and @artexswap`,
    name: 'Artela',
    handler: 'Artela_Network',
    avatar: 'https://x.com/Artela_Network/photo',
    link: 'https://x.com/Artela_Network/status/1844410013919612973',
  },
  {
    content: `We're thrilled to share that we've formed a strategic partnership with @LXDAO_Official, a leading developer-focused community dedicated to sustainably supporting valuable Web3 public goods and open-source projects.`,
    name: 'Artela',
    handler: 'Artela_Network',
    avatar: 'https://x.com/Artela_Network/photo',
    link: 'https://x.com/Artela_Network/status/1775069684385366026',
  },
  {
    content: `祝贺@LXDAO_Official和@brucexu_eth以及所有为了公共物品奉献的朋友们，两周年快乐！`,
    name: 'Victor Zhou',
    handler: 'ZainanZhou',
    avatar: 'https://x.com/BestLidamao/photo',
    link: 'https://x.com/ZainanZhou/status/179V7864398624837718',
  },
  {
    content: `很高兴见证 @LXDAO_Official 成立两年来的快速发展。LXDAO 一直致力于支持中文社区的 Web3 公共物品发展。期待 BuidlerDAO 与 LXDAO 继续深化合作，共同推动 Web3 行业繁荣！`,
    name: 'BuidlerDAO',
    handler: 'BuidlerDAO',
    avatar: 'https://x.com/BuidlerDAO/photo',
    link: 'https://x.com/BuidlerDAO/status/1797801153650180421',
  },
  {
    content: `优质输出的华语以太坊建设者list  评选标准：有优质硬核文章输出能力。视野广泛，对以太坊有深刻洞察的个人，或以太坊相关官方华语社区账号。
LXDAO 是面向 Web3 华人开发者的开源社区，分享技术知识，常有公开课分享`,
    name: 'PlanckerDAO',
    handler: 'PlanckerDAO',
    avatar: 'https://x.com/PlanckerDAO/photo',
    link: 'https://x.com/PlanckerDAO/status/1753329682463015177',
  },
  {
    content: `优质输出的华语以太坊建设者list  评选标准：有优质硬核文章输出能力。视野广泛，对以太坊有深刻洞察的个人，或以太坊相关官方华语社区账号。
LXDAO 是面向 Web3 华人开发者的开源社区，分享技术知识，常有公开课分享`,
    name: 'PlanckerDAO',
    handler: 'PlanckerDAO',
    avatar: 'https://x.com/PlanckerDAO/photo',
    link: 'https://x.com/PlanckerDAO/status/1753329682463015177',
  },
  {
    content: `Glad to see over 30 buidlers got their rewards from LXDAO last month!
More decentralized and more people joining us for supporting Web3 Public Goods!`,
    name: 'Bruce',
    handler: 'brucexu_eth',
    avatar: 'https://x.com/brucexu_eth/photo',
    link: 'https://x.com/brucexu_eth/status/1669273384121946113',
  },
  {
    content: `何为public goods：GCC《Web3公共物品生态研究报告》总结 作者： @HYbigboss
本文以读后总结的形式，为大家介绍由 @LXDAO_Official
及 @GCCofCommons 共同撰写的 76 页《Web3 公共物品⽣态研究报告》。这是目前关于web3公共物品的研究成果中，最有参考价值的资料之一`,
    name: '极客 Web3',
    handler: 'geeksweb3',
    avatar: 'https://x.com/geeksweb3/photo',
    link: 'https://x.com/geeksweb3/status/1772257636224032817',
  },
  {
    content: `Partnership Announcement
@LXDAO_official& @MarsDAO_
We are excited to announce a partnership with LXDAO!  We will co-host and support various Web3 events, provide support for Web3 educational resources and incubate projects together！`,
    name: 'MarsDAO',
    handler: 'MarsDAO_',
    avatar: 'https://x.com/MarsDAO_/photo',
    link: 'https://x.com/MarsDAO_/status/1642840135753687041',
  },
];
