import { Box, Link, Typography } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

import Container from '@/components/Container';
import StyledTooltip from '@/components/StyledToolTip';
import Tag from '@/components/Tag';

import { getMemberFirstBadgeAmount } from '@/utils/utility';

import styled, { keyframes } from 'styled-components';

const textColorGradient = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;

const HightlightText = styled.span`
  background-size: 400% 400%;
  background-image: linear-gradient(to right, #366eff, #23e5ff, #ff7fdb);
  -webkit-background-clip: text;
  animation: ${textColorGradient} 10s ease infinite;
  color: transparent;
  font-size: 36px;
  line-height: 100px;
  font-weight: 700;
  @media screen and (max-width: 900px) {
    font-size: 2.5rem;
    line-height: 1.02;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.5rem;
    line-height: 1.02;
  }
`;

export default function NewSectionOnBoarding({ buidlers }) {
  return (
    <Box
      sx={{
        width: '100vw',
        backgroundImage: `url('/images/new/top-bg.svg'), url('/images/new/bottom-bg.svg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top, bottom',
      }}
    >
      <Container
        minHeight={{ md: '990px', xs: '660px' }}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="center"
        pt="70px"
      >
        <Box
          alignSelf="end"
          component="img"
          width={{ md: '590px', xs: '352px' }}
          src="/images/new/infinite.gif"
        ></Box>
        <Box alignSelf="start" mt="60px">
          <Typography
            fontSize={{ md: '40px', xs: '24px' }}
            maxWidth="674px"
            fontWeight="500"
            textAlign="left"
          >
            We are committed to creating an{' '}
            <span
              style={{
                fontWeight: '700',
              }}
            >
              infinite cycle
            </span>{' '}
            that promotes public goods and open source for an&nbsp;
            <span
              style={{
                fontWeight: '700',
              }}
            >
              {''}open and beautiful
            </span>
            society.
          </Typography>
          <br />
          <Typography fontSize={{ md: '32px', xs: '20px' }} textAlign="left">
            Here is how we make it real.
          </Typography>
        </Box>
      </Container>
      <OnBoardingSection
        title="Education"
        description="We held various events to let the ideas about Public Goods reach more people."
        index="01"
      >
        <Box
          sx={{
            width: '100%',
            overflow: 'scroll',
            mt: '120px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              width: 'fit-content',
              borderRadius: '24px',
              ml: 'calc((100vw - Min(90vw, 1216px))/2)',
              backgroundColor: '#CEE8F8',
              padding: '12px',
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end',
                  width: '300px',
                  height: '400px',
                  color: 'white',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent),url('/images/new/example.png')`,
                }}
              >
                <Typography fontSize="28px" fontWeight="600">
                  EDCON
                </Typography>
                <Box fontSize="14px" leading="10px">
                  <Typography>2024.07</Typography>
                  <Typography>@Tokyo</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </OnBoardingSection>
      <OnBoardingSection
        title="Onboarding"
        description="We onboard talents with 'LX' to research & develop."
        index="02"
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',

              flexWrap: 'wrap',
              gap: '12px',
              width: '100%',
              padding: '12px',
              height: '100%',
              backgroundColor: '#C6F5F1',
              borderRadius: '24px',
              my: '52px',
            }}
          >
            {buidlers.map((buidler, index) => {
              const firstMemberBadgeAmount = getMemberFirstBadgeAmount(
                buidler?.badges
              );
              const active =
                buidler?.status === 'ACTIVE' ||
                (buidler?.status === 'PENDING' && firstMemberBadgeAmount > 0);
              if (!active) return;
              return (
                <Box key={index}>
                  <BudilerTooltip
                    buidler={buidler}
                    active={active}
                    display={{ md: 'block', xs: 'none' }}
                  />
                  <BuidlerAvatarBox
                    buidler={buidler}
                    active={active}
                    display={{ md: 'none', xs: 'block' }}
                  />
                </Box>
              );
            })}
          </Box>
          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
            }}
            onClick={() => {
              window.open('/buidlers', '_blank');
            }}
          >
            VIEW ALL MEMBERS
          </MuiButton>
        </Container>
      </OnBoardingSection>
      <OnBoardingSection
        title="Research"
        description="We carry out research to dig out and keep updated with the latest happenings."
        index="03"
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#CEE8F8',
              padding: '12px',
              borderRadius: '24px',
              my: '64px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                bgcolor: 'white',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: { md: 'row', xs: 'column' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: { md: '36px 60px', xs: '24px 30px' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      maxWidth: { md: '120px', xs: '100%' },
                      minWidth: { md: '120px', xs: '100%' },
                    }}
                  >
                    <MyTag color="blue">NFT</MyTag>
                    <MyTag color="green">Open source</MyTag>
                  </Box>
                  <Box minWidth={{ md: '600px', xs: '100%' }}>
                    <Typography fontSize="24px" fontWeight="700">
                      Report on Web3 Public Goods Ecosystem
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '16px',
                        color: '#666',
                        fontSize: '14px',
                      }}
                    >
                      <Typography>2024/10/02</Typography>
                      <Typography>@Tiao</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: { md: 'block', xs: 'none' } }}
                    component="img"
                    src="/images/new/arrow.svg"
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
            }}
          >
            VIEW ALL RESEARCH
          </MuiButton>
        </Container>
      </OnBoardingSection>
      <OnBoardingSection
        title="Projects"
        description="We are the trustworthy team to ideate, develop and maintain Web3 Public Goods."
        index="04"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Container
            maxWidth="1316px"
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              my: '52px',
            }}
          >
            <ProjectGroupCard
              title="Coordination & Governance"
              image="/images/new/projects/puzzle.svg"
              projects={[
                {
                  name: 'FairSharing',
                  description:
                    'FairSharing is reshape the way human collaborate and allocate, building a more equitable society.',
                  banner:
                    'https://cdn.lxdao.io/bafkreiaxc6u7krl4xb4macgzmdnzfivj26fpw6j57zgo2lkxy7spv7oxay.png',
                  href: '/projects/012',
                },
                {
                  name: 'ETHPanda Collaboration',
                  description:
                    'ETHPanda is composed of a group of Chinese-speaking builders who are concerned about Ethernet. We will promote the construction of a public network for Chinese-speaking builders of Ethernet, and bring everyone’s strength together to better support Ethernet.',
                  banner:
                    'https://cdn.lxdao.io/af8e14c1-0515-4c75-b3fa-6fcac39e94bc.png',
                  href: '/projects/021',
                },
                {
                  name: 'OPCN',
                  description:
                    'Officially established Optimism Chinese Community, OP Chinese Community is an organisation initiated by GCC, LXDAO, PlanckerDAO, Dengchain Community and TraDAO to spread the concept of Optimism technology and public goods, aiming to be a bridge linking the Chinese-speaking community and the Optimism ecosystem. It aims to be a bridge between the Chinese-speaking community and the Optimism ecosystem, to promote two-way communication within the Optimism ecosystem and the Chinese-speaking community, and to promote the prosperity of public goods.',
                  banner:
                    'https://cdn.lxdao.io/a4514cbc-26b4-4d2d-9704-02630b7a22d2.png',
                  href: '/projects/018',
                },
              ]}
            />
            <ProjectGroupCard
              title="Education"
              image="/images/new/projects/lightbulb.svg"
              projects={[
                {
                  name: 'MyFirstLayer2',
                  description:
                    'MyFirstLayer2 is an education project for newbies to learn and interact with Layer2. As you can see from the name, our users are beginners curious about the knowledge and projects on Layer2. We will use funny and easy-to-understand diagrams and animation to explain Layer2 to newbies.',
                  banner:
                    'https://cdn.lxdao.io/bafybeibietdc7lxki2jeggdu5namnyisuujhgej2zsq26nn7orn2cngm6y.png',
                  href: '/projects/010',
                },
                {
                  name: 'Intensive Co-learning',
                  description:
                    'A co-learning program based on Github. Participants need to learn and share for 21 days in a row. The topics...',
                  banner:
                    'https://cdn.lxdao.io/bafkreifmpi4vszs4zqvm25us2omgpfr6gkxmc7cwvmle6xph6d5axsm4jm.png',
                  href: '/projects/012',
                },
                {
                  name: 'EIP Fun',
                  description:
                    'EIP Fun is a project for making EIPs fun and easy to be adopted by buidlers and advancing EIP ecosystem development.',
                  banner:
                    'https://cdn.lxdao.io/bafkreifmpi4vszs4zqvm25us2omgpfr6gkxmc7cwvmle6xph6d5axsm4jm.png',
                  href: '/projects/011',
                },
              ]}
            />
            <ProjectGroupCard
              title="Tech Support"
              image="/images/new/projects/wrench.svg"
              projects={[
                {
                  name: 'Zuzalu City',
                  description:
                    'FairSharing is reshape the way human collaborate and allocate, building a more equitable society.',
                  banner:
                    'https://cdn.lxdao.io/92433f15-4b72-43c5-adce-ffebedcfc2a2.png',
                  href: '/projects/022',
                },
                {
                  name: 'ETHPanda',
                  description:
                    'ETHPanda is composed of a group of Chinese-speaking builders who are concerned about Ethernet. We will promote the construction of a public network for Chinese-speaking builders of Ethernet, and bring everyone’s strength together to better support Ethernet.',
                  banner:
                    'https://cdn.lxdao.io/af8e14c1-0515-4c75-b3fa-6fcac39e94bc.png',
                  href: '/projects/024',
                },
              ]}
            />

            <ProjectGroupCard
              title="Applications"
              image="/images/new/projects/mouse-pointer-click.svg"
              projects={[
                {
                  name: 'Donate3',
                  description:
                    'Accept donations securely via a button on your website, or a link on social media , article and so on. Coming soon...',
                  banner:
                    'https://cdn.lxdao.io/bafkreihrxxou74qo3aunx2qcuai2ocjxvc2zogpnw7t5bjufdufywrzuay.png',
                  href: '/projects/006',
                },
                {
                  name: 'MetaPavo',
                  description:
                    'All-in-one Web3 Information Linking Tool. Simply. Directly. Safety.',
                  banner:
                    'https://cdn.lxdao.io/bafkreibonzmrl3snslc2ijhees2hmd7xntb32vzlax6kllurpptvh5qsra.png',
                  href: '/projects/022',
                },
              ]}
            />
            <ProjectGroupCard
              title="Dev Services"
              image="/images/new/projects/package-open.svg"
              projects={[
                {
                  name: 'Img3',
                  description:
                    'Img3 is an essential infrastructure in the Web3 storage field. It provides the easiest way for you to implement images rendering, uploading, etc. based on Web3 storage like IPFS.',
                  banner:
                    'https://cdn.lxdao.io/bafkreicetd3xpmgbj33g7lovw6oh6xexlbsi76icghrb2y5i4e5igexyqy.png',
                  href: '/projects/009',
                },
                {
                  name: 'Web3logo',
                  description:
                    'Web3logo will become the largest and most comprehensive Web3 emblem collection center, allowing users to quickly download all Web3 emblems and contribute to Web3 charitable initiatives.',
                  banner:
                    'https://cdn.lxdao.io/bafkreihphtmqgsj4kpxw2uwfdz76hs7zictduk3v32ryo5hs5ef55gmu6a.png',
                  href: '/projects/014',
                },
              ]}
            />
          </Container>
          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
              mt: '52px',
              justifySelf: 'center',
            }}
            onClick={() => {
              window.open('/projects', '_blank');
            }}
          >
            VIEW ALL PROJECTS
          </MuiButton>
        </Box>
      </OnBoardingSection>
      <OnBoardingSection
        title="Working Groups"
        description="As part of the sustainable solution, LXDAO itself operates as a DAO to ensure 'public goods by the public, for the public.'"
        index="05"
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: { md: 'row', xs: 'column' },
              alignItems: 'center',
              justifyContent: 'space-between',
              my: '64px',
              gap: '24px',
            }}
          >
            <WorkingGroupCard
              title="Governance"
              href="/workingGroups/1"
              image="https://cdn.lxdao.io/483c815a-5a91-49e3-839a-9c64f30b5535.png"
            />
            <WorkingGroupCard
              title="Forge"
              href="/workingGroups/6"
              image="https://cdn.lxdao.io/14c863c9-f086-40fc-b0d7-584c118d1840.png"
            />
            <WorkingGroupCard
              title="Operation"
              href="/workingGroups/5"
              image="https://cdn.lxdao.io/8ec73781-f67a-493e-8f39-422ab706c77f.png"
            />
          </Box>

          <MuiButton
            variant="contained"
            sx={{
              borderRadius: '100px',
              padding: '12px 40px',
            }}
            onClick={() => {
              window.open('/workingGroups/list', '_blank');
            }}
          >
            VIEW ALL
          </MuiButton>
        </Container>
      </OnBoardingSection>
      <Typography
        fontSize="36px"
        paddingTop="100px"
        paddingBottom="200px"
        textAlign="center"
        fontWeight="700"
      >
        Know more about&nbsp;
        <HightlightText>How LXDAO Works</HightlightText>
      </Typography>
    </Box>
  );
}

function ProjectGroupCard({ title, image, projects }) {
  return (
    <Box
      sx={{
        width: {
          md:
            projects.length == 3 ? 'calc(50% - 6px)' : 'calc((100% - 24px)/3)',
          xs: '100%',
        },
        p: '36px 24px',
        bgcolor: '#C6F5F1',
        borderRadius: '24px',
      }}
    >
      <Box display="flex" alignItems="center" gap="9px">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            bgcolor: 'black',
            borderRadius: '40px',
          }}
        >
          <Box component="img" src={image} />
        </Box>

        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            maxWidth: '200px',
            lineHeight: '24px',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: 'space-between',
          width: '100%',
          mt: '24px',
          gap: '12px',
        }}
      >
        {projects.map((project, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              p: { md: '16px 12px', xs: '24px 16px' },
              width: {
                md: `calc((100% - 24px)/${projects.length})`,
                xs: '100%',
              },
              maxWidth: { md: '190px', xs: '100%' },
              bgcolor: 'white',
              borderRadius: '24px',
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open(project.href, '_blank');
            }}
          >
            <Box
              width="100%"
              height="auto"
              borderRadius="12px"
              component="img"
              border="0.5px solid #D9D9D9"
              src={project.banner}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                height: '48px',
                alignItems: 'end',
              }}
            >
              <Typography
                fontSize={{ md: '18px', xs: '16px' }}
                fontWeight="700"
                maxWidth={{ md: '163px', xs: '100%' }}
              >
                {project.name}
              </Typography>
            </Box>
            <Typography
              fontSize="14px"
              color="#666"
              width={{ md: '163px', xs: '100%' }}
              textAlign="left"
              height="75px"
              textOverflow="ellipsis"
              overflow="hidden"
              lineHeight="1.4"
              // whiteSpace="nowrap"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
              }}
            >
              {project.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function WorkingGroupCard({ title, href, image }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#CEE8F8',
        p: '12px 12px 24px 12px',
        borderRadius: '29px',
        cursor: 'pointer',
      }}
      onClick={() => {
        window.open(href, '_blank');
      }}
    >
      <Box
        component="img"
        width={{ md: '360px', xs: '300px' }}
        borderRadius="24px"
        src={image}
      />
      <Typography mt={{ md: '24px', xs: '16px' }} fontSize="24px">
        {title}
      </Typography>
    </Box>
  );
}

function MyTag({ color, children }) {
  return (
    <Box align="center">
      <Typography
        fontSize={{ md: '14px', xs: '12px' }}
        sx={{
          alignItems: 'center',
          color: color == 'green' ? '#4DCC9E' : '#36AFF9',
          background: color == 'green' ? 'rgba(77, 204, 158, 0.1)' : '#e4eff5',
          display: 'initial',
          lineHeight: '23.92px',
          padding: '4px 12px',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

const BudilerTooltip = ({
  buidler,
  handleBuidlerCardHover,
  handleBuidlerCardLeave,
  ...rest
}) => {
  const BuidlerDetails = ({ name, description, address, role }) => {
    return (
      <Box>
        <Typography
          color="#000000"
          variant="h5"
          lineHeight="24px"
          fontWeight={500}
          marginBottom={3}
        >
          {name}
        </Typography>
        <Typography
          color="#666F85"
          variant="body1"
          lineHeight="24px"
          fontWeight={400}
          marginBottom="17px"
        >
          {description}
        </Typography>
        {role?.length && (
          <Box display="flex" flexWrap="wrap" marginBottom="25px">
            {role.map((roleItem, index) => {
              return <Tag key={index} text={roleItem} />;
            })}
          </Box>
        )}
        <Link
          href={`/buidlers/${address}`}
          sx={{ textDecoration: 'none' }}
          target="_blank"
        >
          <Typography
            color="#101828"
            variant="body1"
            lineHeight="24px"
            fontWeight={500}
            textAlign="right"
          >
            More -{`>`}
          </Typography>
        </Link>
      </Box>
    );
  };

  const firstMemberBadgeAmount = getMemberFirstBadgeAmount(buidler?.badges);

  return (
    <Box {...rest}>
      <StyledTooltip
        title={<BuidlerDetails {...buidler} />}
        placement="bottom-start"
      >
        <Box
          sx={{ aspectRatio: '1 / 1' }}
          onMouseOver={handleBuidlerCardHover}
          onMouseLeave={handleBuidlerCardLeave}
          position="relative"
        >
          <BuidlerAvatarBox
            buidler={buidler}
            active={
              buidler?.status === 'ACTIVE' ||
              (buidler?.status === 'PENDING' && firstMemberBadgeAmount > 0)
            }
            display="block"
          />
        </Box>
      </StyledTooltip>
    </Box>
  );
};

const BuidlerAvatarBox = ({ buidler, active, display }) => {
  return (
    <Link
      href={`/buidlers/${buidler.address}`}
      target="_blank"
      sx={{
        textDecoration: 'none',
        aspectRatio: '1 / 1',
      }}
      display={display}
      width="121px"
      height="121px"
      position="relative"
    >
      {!active && (
        <Box
          sx={{ position: 'absolute', zIndex: 1 }}
          component="img"
          src={'/icons/onboarding.svg'}
        />
      )}
      <Box
        width={{ sm: '121px', xs: '100%' }}
        sx={{ position: 'absolute', top: 0, left: 0, aspectRatio: '1 / 1' }}
        backgroundColor={active ? 'transpent' : 'rgba(0,0,0,0.5)'}
        display={{ md: 'block', xs: 'none' }}
      />
      <Box width={{ sm: '121px', xs: '100%' }} height="100%">
        <Box
          component="img"
          width={{ xs: '100%' }}
          src={buidler?.avatar || '/images/placeholder.jpeg'}
          sx={{ aspectRatio: '1 / 1' }}
          borderRadius="12px"
          border="0.5px solid #D0D5DD"
        />
      </Box>
    </Link>
  );
};

function OnBoardingSection({ title, description, index, children }) {
  return (
    <Box paddingY={{ md: '140px', xs: '40px' }}>
      <Box
        maxWidth="1216px"
        boxSizing="border-box"
        marginX={{ lg: 'auto', md: '20px', xs: '20px' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Typography fontSize={{ md: '80px', xs: '60px' }} fontWeight="700">
            {index}
          </Typography>
          <Box ml="20px">
            <Typography fontSize={{ md: '32px', xs: '20px' }} fontWeight="700">
              {title}
            </Typography>
            <Typography
              fontSize={{ md: '20px', xs: '16px' }}
              fontWeight="500"
              maxWidth="710px"
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

function OnBoardingTitle({ title, description, index }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Typography fontSize="80px" fontWeight="700">
        01
      </Typography>
      <Box ml="20px">
        <Typography fontSize="32px" fontWeight="700">
          {title}
        </Typography>
        <Typography fontSize="20px" fontWeight="500">
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
