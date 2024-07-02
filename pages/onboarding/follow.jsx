import { Box, Typography, Link } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import OnBoardingLayout from '@/components/OnBoardingLayout';
import { useEffect, useState } from 'react';

export default function Follow() {
  const [state, setState] = useState(new Array(7).fill(false));
  useEffect(() => {
    const checked = sessionStorage?.getItem('checked');
    setState(checked ? checked.split(',').map((v) => v == 'true') : state);
  }, []);
  useEffect(() => {
    sessionStorage.setItem('checked', state.toString());
  }, [state]);
  const data = [
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Follow the official Twitter:{' '}
      <Link href="https://twitter.com/LXDAO_Official" color="#36AFF9">
        https://twitter.com/LXDAO_Official
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Follow the LXDAO Twitter List:{' '}
      <Link
        href="https://twitter.com/i/lists/1576113456792551424"
        color="#36AFF9"
      >
        https://twitter.com/i/lists/1576113456792551424
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Register on Forum:{' '}
      <Link href="https://forum.lxdao.io" color="#36AFF9">
        https://forum.lxdao.io
      </Link>{' '}
      (main community)
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Discord:{' '}
      <Link href="http://discord.lxdao.io/" color="#36AFF9">
        http://discord.lxdao.io/
      </Link>{' '}
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Notion:{' '}
      <Link
        href="https://www.notion.so/lxdao/b4d1a5bb1f944785b1f8942608066552?pvs=9"
        color="#36AFF9"
      >
        https://www.notion.so/lxdao/b4d1a5bb1f944785b1f8942608066552?pvs=9
      </Link>
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      GitHub:{' '}
      <Link href="https://github.com/lxdao-official" color="#36AFF9">
        https://github.com/lxdao-official
      </Link>{' '}
      (for developers)
    </Typography>,
    <Typography
      variant="body1"
      color="#666F85"
      sx={{
        wordBreak: 'break-all',
      }}
    >
      Subscribe newsletter with your email (on the bottom of{' '}
      <Link href="https://lxdao.io/" color="#36AFF9">
        https://lxdao.io/
      </Link>
      )
    </Typography>,
  ];
  const handleChange = (event) => {
    let pre = [...state];
    pre[event.target.name] = event.target.checked;
    setState(pre);
  };
  const selectAll = state.filter((v) => v).length == 7;
  return (
    <OnBoardingLayout
      title="Follow LXDAO Community"
      desc="Follow our main social media and community platforms"
      back="/onboarding/intro"
      next="/onboarding/profile"
      disableNext={!selectAll}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'start' },
          mt: '25px',
          mb: '48px',
        }}
      >
        <Box>
          <FormControl
            required
            component="fieldset"
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormGroup>
              {data.map((value, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: '#999CA0',
                          '&.Mui-checked': {
                            color: '#36AFF9',
                          },
                          wordBreak: 'break-all',
                        }}
                        checked={state[index]}
                        onChange={handleChange}
                        name={index}
                      />
                    }
                    label={value}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <Box
          component="img"
          src="/icons/onboarding/follow.svg"
          sx={{
            mt: { sx: '32px', md: '84px' },
            mb: { sx: '32px', md: '71px' },
          }}
        />
      </Box>
    </OnBoardingLayout>
  );
}
