import OnBoardingLayout from '@/components/OnBoardingLayout';
import LXButton from '@/components/Button';
import {
  Card,
  Box,
  Typography,
  Link,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@/components/Container';
import ProfileForm from '@/components/ProfileForm';
import BuidlerContacts from '@/components/BuidlerContacts';
import { convertIpfsGateway } from '@/utils/utility';
import Tag from '@/components/Tag';
import Skills from '@/components/Skills';
import { useState } from 'react';
import _ from 'lodash';

export function BuidlerCard({ record, simpleMode = false }) {
  // const record = props.record;
  const skills = record?.skills ? record?.skills : [];
  // const simpleMode = props.simpleMode;

  return record ? (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      height="100%"
      mt="48px"
    >
      <Box display="flex">
        <Box
          flex="0 0 80px"
          width="80px"
          height="80px"
          borderRadius="6px"
          overflow="hidden"
          border="0.5px solid #E5E5E5"
          marginRight={3}
        >
          <img
            style={{ display: 'block', width: 80, height: 80 }}
            src={
              convertIpfsGateway(record.avatar) || '/images/placeholder.jpeg'
            }
            alt=""
          />
        </Box>

        <Box
          flex={1}
          display="flex"
          width="calc(100% - 85px)"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            variant="h5"
            sx={{
              lineHeight: '24px',
              fontWeight: '500',
              color: '#000',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {record.name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: '24px',
              fontWeight: '500',
              color: '#666F85',
              textTransform: 'uppercase',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {record.address.slice(0, 16) +
              '...' +
              record.address.slice(-14, -1)}
          </Typography>
          <Box height={{ sm: '48px', md: '36px' }} overflow="hidden">
            <BuidlerContacts contacts={record.contacts} />
          </Box>
        </Box>
      </Box>
      {!simpleMode && record.description && (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: '24px',
              color: '#666F85',
            }}
          >
            {record.description}
          </Typography>
        </Box>
      )}
      {!simpleMode && record.role.length > 0 ? (
        <Box display="flex" flexWrap="wrap" marginTop={2}>
          {record.role.map((item) => {
            return <Tag key={item} text={item}></Tag>;
          })}
        </Box>
      ) : null}
      {!simpleMode && skills.length > 0 && (
        <Box marginTop={2}>
          <Typography
            color="#101828"
            fontWeight="600"
            marginBottom={1}
            variant="body1"
          >
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap">
            <Skills skills={skills} />
          </Box>
        </Box>
      )}
    </Box>
  ) : (
    <Box
      border="0.5px solid #D0D5DD"
      borderRadius="6px"
      padding={3}
      position="relative"
      height="100%"
      mt="48px"
    >
      <Box display="flex">
        <Skeleton variant="rectangular" width={80} height={80} sx={{ mr: 3 }} />
        <Box
          flex={1}
          display="flex"
          width="calc(100% - 85px)"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Skeleton variant="rectangular" width={104} height={16} />
          <Skeleton
            variant="rectangular"
            maxWidth={315}
            height={16}
            sx={{ mr: 3 }}
          />

          <Box
            display={'flex'}
            height={{ sm: '48px', md: '36px' }}
            overflow="hidden"
          >
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
            <Skeleton
              variant="circular"
              width={28}
              height={28}
              sx={{ mx: '4px' }}
            />
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" marginTop={2}>
        <Skeleton variant="rectangular" maxWidth={432} height={20} />
        <Skeleton
          variant="rectangular"
          width={'80%'}
          height={20}
          sx={{ mt: '4px' }}
        />
      </Box>

      <Box display="flex" flexWrap="wrap" marginTop={2}>
        <Skeleton
          variant="rectangular"
          width={65}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={170}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={130}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={125}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
        <Skeleton
          variant="rectangular"
          width={70}
          height={23}
          sx={{ mt: '4px', mr: '4px' }}
        />
      </Box>

      <Box marginTop={2}>
        <Typography
          color="#101828"
          fontWeight="600"
          marginBottom={1}
          variant="body1"
        >
          Skills
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <Skeleton
            variant="rectangular"
            width={137}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
          />
          <Skeleton
            variant="rectangular"
            width={60}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#009fff' }}
          />
          <Skeleton
            variant="rectangular"
            width={48}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
          />
          <Skeleton
            variant="rectangular"
            width={142}
            height={21}
            sx={{ mt: '4px', mr: '4px', bgcolor: '#b6dffd' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default function Profile() {
  const [visible, setVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const record = {
    id: 47,
    createdAt: '2022-12-27T13:51:27.301Z',
    updatedAt: '2023-02-10T09:26:55.179Z',
    deletedAt: null,
    name: '0xhardman.eth',
    description:
      'Web3 believer and builder | Loving to try something new | Inspired to become a digital nomad | Member of BUPT3',
    image:
      'https://api.lxdao.io/buidler/0xb15115A15d5992A756D003AE74C0b832918fAb75/card',
    avatar:
      'https://bafkreihsae3y2utijlsn2dyu2dybdajasgp5lgokhlygnxzhduljga4fae.ipfs.nftstorage.link',
    role: ['Buidler'],
    address: '0xb15115A15d5992A756D003AE74C0b832918fAb75',
    status: 'ACTIVE',
    skills: [
      { name: 'FullStack', level: 'Intermediate' },
      { name: 'Solidity', level: 'Junior' },
      { name: 'Project Management', level: 'Junior' },
      { name: 'Product Management', level: 'Junior' },
    ],
    interests: [
      'FrontEnd',
      'FullStack',
      'BackEnd',
      'Solidity',
      'DAO',
      'Blockchain',
    ],
    contacts: {
      email: 'sazhang0928@gmail.com',
      github: 'https://github.com/SAZZM',
      wechat: 'zhang1142783160',
      discord: '0xhardman#7955',
      twitter: '@fuckingsafari',
      website: '',
      telegram: '@sazhang',
    },
    nonce: '1ec1b5d7-05bf-4db8-a70e-07ea8f26a6f7',
    ipfsURI: 'ipfs://QmUXL7BP3DKb7PLNQNMrWsGs7mKJUKxqWYhryuKorMp6GN',
    lxPoints: [],
    projects: [],
    buddies: [
      {
        id: 8,
        createdAt: '2022-09-23T11:21:40.623Z',
        updatedAt: '2023-02-07T08:24:34.606Z',
        deletedAt: null,
        name: 'DaoDAO',
        description:
          'Web3 Buidler / Product Designer / Work at LXDAO Foundation / Member of NextDAO',
        image:
          'https://api.lxdao.io/buidler/0xF7129631fad9C3a52a55EB6Ef96646C84e2161C4/card',
        avatar:
          'https://bafkreica7ou64dqrp3aamn6utvfzgdnj6ulsxqupizqqly2k5vbnay4dx4.ipfs.nftstorage.link',
        role: ['Buidler', 'Onboarding Committee'],
        address: '0xF7129631fad9C3a52a55EB6Ef96646C84e2161C4',
        status: 'ACTIVE',
        skills: [
          { name: 'Product Management', level: 'Senior' },
          { name: 'UI/UX Design', level: 'Intermediate' },
          { name: 'FrontEnd', level: 'Intermediate' },
        ],
        interests: [
          'UI/UX Design',
          'Product Management',
          'Others',
          'Blockchain',
        ],
        contacts: {
          email: '',
          github: 'http://github.com/idao',
          wechat: '',
          discord: 'DaoDAO#8530',
          twitter: '@daodao',
          website: 'https://daodao.org',
          telegram: '@daodao',
        },
        nonce: 'ef9bf428-5023-4f52-ba5d-156d1f074f05',
        ipfsURI: 'ipfs://QmRe9xufG5e5uicxRZbKBpc9z8oVLuLrMev1UXEAZfk3y7',
      },
    ],
  };
  const data = {
    id: 1,
    createdAt: '2022-09-11T04:24:16.176Z',
    updatedAt: '2023-02-13T21:49:56.694Z',
    deletedAt: null,
    name: 'Bruce Xu',
    description:
      'Web3 Buidler | Work at LXDAO Foundation | LXDAO Project Manager | Member of NextDAO and 8DAO.',
    image:
      'https://api.lxdao.io/buidler/0x17c57bD297175e5711Ee3Daf045252B588f3162F/card',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/bafkreibswn22ifwqcf246axiwhnrjzgbnvvodaiqntxc3u5xulzesp33fu',
    role: ['Buidler', 'Onboarding Committee', 'Project Manager', 'Investor'],
    address: '0x17c57bD297175e5711Ee3Daf045252B588f3162F',
    status: 'ACTIVE',
    skills: [
      { name: 'Project Management', level: 'Senior' },
      { name: 'FullStack', level: 'Senior' },
      { name: 'FrontEnd', level: 'Senior' },
      { name: 'Solidity', level: 'Junior' },
      { name: 'Product Management', level: 'Junior' },
    ],
    interests: [
      'Project Management',
      'Product Management',
      'FullStack',
      'DAO',
      'Solidity',
      'Blockchain',
    ],
    contacts: {
      email: 'bruce.xu@lxdao.io',
      github: 'https://github.com/brucexu-eth',
      discord: 'Bruce | LXDAO#5678',
      twitter: '@brucexu_eth',
      telegram: '@brucexu_eth',
    },
    nonce: '1e336c88-d650-415e-b567-dd1f0ec3a45c',
    ipfsURI: 'ipfs://QmXVf1yF1bfD1PgybRzYqjXTf4YXxDN81mpcKZKyoE8jes',
    projects: [
      {
        id: 1,
        createdAt: '2022-09-16T12:29:01.203Z',
        updatedAt: null,
        deletedAt: null,
        projectId: 1,
        projectRole: ['Project Manager'],
        startedAt: '2022-02-15T00:00:00.000Z',
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 1,
          createdAt: '2022-09-11T03:04:11.865Z',
          updatedAt: null,
          deletedAt: null,
          number: '000',
          name: 'GuoChanLiangXin',
          description:
            'GCLX NFT project is a Performance Art. It is made by 1000 randomly generated NFTs, sold for 0.01 ETH. Using funny content to tell Chinese NFT players what NFTs truly are.',
          banner:
            'https://bafkreib7zk4vylrsmg6utiafesfx7dp6fb6e3hp65vi7dbvx3rlsptpxnu.ipfs.nftstorage.link/',
          logo: 'https://bafkreievwhf2tio3vchwutaw5rahl4xm6ssl5ajmbsfijfdl6pqxoq7wkq.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreievwhf2tio3vchwutaw5rahl4xm6ssl5ajmbsfijfdl6pqxoq7wkq.ipfs.nftstorage.link/',
          status: 'LAUNCHED',
          tags: ['NFT', 'OPEN SOURCE'],
          launchDate: '2022-02-23T00:00:00.000Z',
          links: {
            forum: 'https://forum.lxdao.io/c/projects/000-gclx/13',
            github: 'https://github.com/lxdao-official',
            opensea: 'https://opensea.io/collection/gclx',
            twitter: 'https://twitter.com/gclxnft',
            website: 'https://gclx.xyz/',
          },
          isAbleToJoin: true,
        },
      },
      {
        id: 5,
        createdAt: '2022-10-29T11:42:06.245Z',
        updatedAt: null,
        deletedAt: null,
        projectId: 4,
        projectRole: ['Project Manager'],
        startedAt: '2022-07-14T00:00:00.000Z',
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 4,
          createdAt: '2022-09-11T03:06:39.510Z',
          updatedAt: null,
          deletedAt: null,
          number: '003',
          name: 'Web3 in 2032',
          description:
            'In 2032, there are a billion people live on Web3 everyday. This project documents something that will have happened on Web3 in 2032.',
          banner:
            'https://bafkreig6nroroczis7jvjeqyh4y2s4a54kqaifnjz2tuzm2jbl6madwif4.ipfs.nftstorage.link/',
          logo: 'https://bafkreibh74xkuzuyz4u2h5cx7pc4ewwxnjmkdsudmoejn4hx2o7tibbpii.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreibh74xkuzuyz4u2h5cx7pc4ewwxnjmkdsudmoejn4hx2o7tibbpii.ipfs.nftstorage.link/',
          status: 'LAUNCHED',
          tags: ['NFT'],
          launchDate: '2022-07-14T00:00:00.000Z',
          links: {
            forum: 'https://forum.lxdao.io/c/projects/003-2032/17',
            discord: 'https://discord.com/invite/HtcDdPgJ7D',
            opensea: 'https://opensea.io/collection/web3-in-2032',
            twitter: 'https://twitter.com/Web3in2032',
            website: 'https://web3in2032.io/',
          },
          isAbleToJoin: false,
        },
      },
      {
        id: 7,
        createdAt: '2022-10-29T11:44:56.782Z',
        updatedAt: null,
        deletedAt: null,
        projectId: 6,
        projectRole: ['Project Manager'],
        startedAt: '2022-08-28T00:00:00.000Z',
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 6,
          createdAt: '2022-09-24T01:49:49.975Z',
          updatedAt: null,
          deletedAt: null,
          number: '005',
          name: 'Mirror Improvements',
          description:
            'The Mirror.xyz is a vital writing infrastructure in Web3. But their writing experience still has much room to be improved, especially for Chinese users. In this project, we will collect feedback (most from Chinese users) and try to improve them independently or work with Mirror Team.',
          banner:
            'https://bafkreiebnftam4dfgeaefwgzdmbabd4jcrvw46pgijn6b3qizglc56tmm4.ipfs.nftstorage.link/',
          logo: 'https://bafkreifybssouvlhepzdf2lxdm2mnnp6irw3ilnvghebjkzb7dfmodwsnu.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreifybssouvlhepzdf2lxdm2mnnp6irw3ilnvghebjkzb7dfmodwsnu.ipfs.nftstorage.link/',
          status: 'WIP',
          tags: ['PUBLIC GOODS', 'OPEN SOURCE'],
          launchDate: '2022-08-28T13:48:35.000Z',
          links: {
            forum:
              'https://forum.lxdao.io/c/projects/005-mirror-improvements/20',
            website:
              'https://forum.lxdao.io/t/proposal-mirror-xyz-editing-experience-improvement-project/139',
          },
          isAbleToJoin: true,
        },
      },
      {
        id: 3,
        createdAt: '2022-10-29T10:54:44.313Z',
        updatedAt: null,
        deletedAt: null,
        projectId: 2,
        projectRole: ['Project Manager'],
        startedAt: '2022-05-15T00:00:00.000Z',
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 2,
          createdAt: '2022-09-11T03:05:59.624Z',
          updatedAt: null,
          deletedAt: null,
          number: '001',
          name: 'MyFirstNFT',
          description:
            'MyFirstNFT is a non-profit instructional project for Web3 newbies. Get a FREE NFT while learning about Web3, underlying values of NFT, and security principles.',
          banner:
            'https://bafkreig6nn3gnsjakmljh6aymianzge5vb36db5vj3nkpakod7mkytmc3e.ipfs.nftstorage.link/',
          logo: 'https://bafkreicak62jg2q4itgso62rxqhkhbrvh26ydijvirm5ew76qf53t2qc5y.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreicak62jg2q4itgso62rxqhkhbrvh26ydijvirm5ew76qf53t2qc5y.ipfs.nftstorage.link/',
          status: 'LAUNCHED',
          tags: ['PUBLIC GOODS', 'EDUCATIONAL', 'OPEN SOURCE', 'NFT'],
          launchDate: '2022-05-15T00:00:00.000Z',
          links: {
            forum: 'https://forum.lxdao.io/c/projects/001-mfnft/14',
            github: 'https://github.com/lxdao-official',
            discord: 'https://discord.com/invite/CMn25cfgtJ',
            opensea: 'https://opensea.io/collection/mfnft-official',
            twitter: 'https://twitter.com/mfnft_official',
            website: 'https://myfirstnft.info/',
          },
          isAbleToJoin: true,
        },
      },
      {
        id: 22,
        createdAt: '2022-11-30T02:00:24.979Z',
        updatedAt: '2022-11-30T02:01:22.912Z',
        deletedAt: null,
        projectId: 3,
        projectRole: ['Developer'],
        startedAt: '2022-11-30T02:00:24.978Z',
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 3,
          createdAt: '2022-09-11T03:05:59.624Z',
          updatedAt: null,
          deletedAt: null,
          number: '002',
          name: 'MetaPavo',
          description:
            'all-in-one Web3 Information Linking Tool. Simply. Directly. Safety.',
          banner:
            'https://bafkreibonzmrl3snslc2ijhees2hmd7xntb32vzlax6kllurpptvh5qsra.ipfs.nftstorage.link/',
          logo: 'https://bafkreid4hrapk5yie43ocy5eg63memjjrcjawyiuephgyqjedthdhwojhe.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreid4hrapk5yie43ocy5eg63memjjrcjawyiuephgyqjedthdhwojhe.ipfs.nftstorage.link/',
          status: 'WIP',
          tags: ['CHROME EXTENSION', 'OPENSOURCE', 'EARLY ACCESS'],
          launchDate: null,
          links: {
            forum: 'https://forum.lxdao.io/c/projects/002-metapavo/15',
            twitter: 'https://twitter.com/MetaPavo',
            website: 'https://metapavo.xyz/',
          },
          isAbleToJoin: true,
        },
      },
      {
        id: 30,
        createdAt: '2023-01-10T13:10:04.588Z',
        updatedAt: null,
        deletedAt: null,
        projectId: 9,
        projectRole: ['Project Manager'],
        startedAt: null,
        endedAt: null,
        buidlerId: 1,
        status: 'ACTIVE',
        project: {
          id: 9,
          createdAt: '2023-01-10T13:06:46.620Z',
          updatedAt: null,
          deletedAt: null,
          number: '008',
          name: 'MobyMask Improvement',
          description:
            'Redesign and/or polish the MobyMask features with Dan Finlay (MetaMask Founder), making MobyMask a production-ready product and fighting phishers!',
          banner:
            'https://bafkreicr2yvbjd4ikfnvmrum7kkqcqkmggsyviz5xp7i5hrwrcoxb2vl2u.ipfs.nftstorage.link/',
          logo: 'https://bafkreiduhjoug2cqj6ywnv35kw6xlsywj5smijtquljvpg6ausvobhbpgi.ipfs.nftstorage.link/',
          logoLarge:
            'https://bafkreiduhjoug2cqj6ywnv35kw6xlsywj5smijtquljvpg6ausvobhbpgi.ipfs.nftstorage.link/',
          status: 'WIP',
          tags: ['PUBLIC GOODS', 'TOOL', 'SECURITY'],
          launchDate: null,
          links: {
            forum:
              'https://forum.lxdao.io/c/projects/008-mobymask-improvement/',
            github: 'https://github.com/lxdao-official/mobymask-ui',
            twitter: 'https://twitter.com/MobyMask',
            website: 'https://mobymask.com/',
          },
          isAbleToJoin: null,
        },
      },
    ],
  };
  const saveProfileHandler = async (newMetaData) => {
    setUpdating(true);
    const userProfile = {
      ...newMetaData,
      role: record.role.length === 0 ? ['Buidler'] : record.role,
      // set the NFT image
      image: `${process.env.NEXT_PUBLIC_LXDAO_BACKEND_API}/buidler/${record.address}/card`,
    };
    try {
      const response = await API.put(`/buidler/${address}`, {
        metaData: userProfile,
      });
      const result = response?.data;
      if (result.status !== 'SUCCESS') {
        throw new Error(result.message);
      }
      setVisible(false);
      props.refresh();
    } catch (err) {
      showMessage({
        type: 'error',
        title: 'Failed to update profile',
        body: err.message,
      });
    }
    setUpdating(false);
  };
  return (
    <OnBoardingLayout
      title="Update your buidler profile on LXDAO"
      desc="Update your buidler profile on LXDAO"
      back="/onboarding/follow"
      next="/onboarding/mint"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: '48px',
        }}
      >
        <Box maxWidth="505px">
          <BuidlerCard />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: { xs: '100%', md: '505px' },
            mt: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', cursor: 'pointer' }}>
            <Box
              component="img"
              src="/icons/onboarding/refresh.svg"
              width={24}
              height={24}
            ></Box>
            <Typography
              sx={{
                textTransform: 'uppercase',
                ml: '20px',
                color: '#666F85',
              }}
            >
              to refresh
            </Typography>
          </Box>

          <LXButton
            width={104}
            variant="gradient"
            onClick={() => {
              setVisible(true);
            }}
          >
            Edit
          </LXButton>
        </Box>
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        onClose={(event, reason) => {
          if (reason && reason == 'backdropClick') return;
          setVisible(false);
        }}
        open={visible}
      >
        <Box
          onClick={() => {
            setVisible(false);
          }}
          sx={{
            cursor: 'pointer',
          }}
          position="absolute"
          top="16px"
          right="16px"
        >
          <CloseIcon></CloseIcon>
        </Box>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <ProfileForm
            updating={updating}
            values={_.cloneDeep(
              _.pick(record, [
                'avatar',
                'name',
                'description',
                'skills',
                'interests',
                'contacts',
              ])
            )}
            saveProfileHandler={saveProfileHandler}
          />
        </DialogContent>
      </Dialog>
    </OnBoardingLayout>
  );
}
