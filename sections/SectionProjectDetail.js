import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Tooltip,
  Link,
  CardContent,
  Card,
  Avatar,
  Autocomplete,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAccount } from 'wagmi';

import API from '@/common/API';
import { getLocalStorage } from '@/utils/utility';
import { AlertContext } from '@/context/AlertContext';

import Button from '@/components/Button';
import Container from '@/components/Container';
import BuidlerCard from '@/components/BuidlerCard';
import Dialog from '@/components/Dialog';
import DebouncedInput from '@/components/DebouncedInput';
import SingleSelect from '@/components/Select';

const useStyles = makeStyles({
  tooltip: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
    width: '335px',
  },
});

const SectionProjectDetail = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [activeBuidlerList, setActiveBuidlerList] = useState([]);
  const [selectedBuidler, setSelectedBuidler] = useState('');
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [openJoinTooltip, setOpenJoinTooltip] = useState(false);
  const [showJoinButton, setShowJoinButton] = useState(true);
  const [showInviteButton, setShowInviteButton] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentBuidlerOnProjectInfo, setCurrentBuidlerOnProjectInfo] =
    useState({ id: null, ipfsURI: '' });
  const [projectRoleValue, setProjectRoleValue] = useState([]);
  const [inviteBuidlerErrors, setInviteBuidlerErrors] = useState({
    buidler: {
      error: false,
      errorMsg: '',
    },
    role: {
      error: false,
      errorMsg: '',
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 230,
      },
    },
  };

  const projectRoleList = [
    'Project Manager',
    'Developer',
    'Artist',
    'UI/UX Desinger',
    'Operation',
  ];

  const useAlert = () => useContext(AlertContext);
  const { setAlert } = useAlert();
  const { address } = useAccount();
  const classes = useStyles();

  const PROJECT_STATUS = {
    WIP: 'WORK IN PROGRESS',
    LAUNCHED: 'LAUNCHED',
  };

  let projectManagerName = '';
  let projectManagerAddress = '';
  const projectManagerBudilder = project?.buidlersOnProject.find((buidler) =>
    buidler?.projectRole.includes('Project Manager')
  );
  projectManagerName = projectManagerBudilder?.buidler?.name;
  projectManagerAddress = projectManagerBudilder?.buidler?.address;

  const getProjectData = () => {
    API.get(`/project/${projectId}`)
      .then((res) => {
        if (res?.data?.data) {
          setProject(res?.data?.data);
          getBuidlersData(res?.data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProjectData();
  }, [address]);

  const getBuidlersData = (project) => {
    API.get(`/buidler?status=ACTIVE`)
      .then((res) => {
        if (res?.data?.data) {
          const activeBuidlers = [];
          const buidlerIdsOnProject = [];
          project?.buidlersOnProject.forEach((buidlerOnProject) => {
            buidlerIdsOnProject.push(buidlerOnProject?.buidlerId);
          });
          res?.data?.data?.forEach((buidler) => {
            if (!buidlerIdsOnProject.includes(buidler.id)) {
              activeBuidlers.push(buidler);
            }
          });
          setActiveBuidlerList(activeBuidlers);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (address) {
      let showJoinButtonFlag = false;
      let showInviteButtonFlag = false;
      project?.buidlersOnProject.forEach((buidler) => {
        if (buidler?.buidler?.address === address) {
          showJoinButtonFlag = true;
        }
        // if this buidler is on project and status(project) is PENDING, will show accept button
        if (
          buidler?.buidler?.address === address &&
          buidler?.status === 'PENDING'
        ) {
          setShowAcceptButton(true);
          setCurrentBuidlerOnProjectInfo({
            id: buidler?.id,
            ipfsURI: buidler?.buidler?.ipfsURI || '',
          });
        }
        // if this buidler is PM, will show invite button
        if (
          buidler?.projectRole.includes('Project Manager') &&
          buidler?.buidler.address === address
        ) {
          showInviteButtonFlag = true;
        }
      });
      setShowInviteButton(showInviteButtonFlag);
      setShowJoinButton(!showJoinButtonFlag);
    } else {
      setShowJoinButton(true);
      setShowInviteButton(false);
    }
  }, [address, project]);

  const LabelText = ({ label }) => {
    return (
      <Typography
        variant="body1"
        color="#666F85"
        textAlign="left"
        marginBottom={1.5}
      >
        {label}
      </Typography>
    );
  };

  const handleDisplayBuidlerTooltip = (data, status) => {
    const cloneProjectData = { ...project };
    cloneProjectData?.buidlersOnProject.forEach((item) => {
      if (item.id === data.id) {
        item.showTooltip = status === 'open';
      }
    });
    setProject(cloneProjectData);
  };

  const handleBuidlerJoin = () => {
    const accessToken = getLocalStorage('accessToken');
    if (accessToken) {
      setOpenJoinDialog(true);
    } else {
      setOpenJoinTooltip(true);
      setTimeout(() => {
        setOpenJoinTooltip(false);
      }, 3000);
    }
  };

  const handleInviteBuidler = () => {
    const cloneInviteBuidlerErrors = { ...inviteBuidlerErrors };
    if (!selectedBuidler) {
      cloneInviteBuidlerErrors['buidler'].error = true;
      cloneInviteBuidlerErrors['buidler'].errorMsg = 'Please select a buidler';
      setInviteBuidlerErrors({
        ...inviteBuidlerErrors,
        ...cloneInviteBuidlerErrors,
      });
      return;
    }
    if (projectRoleValue.length < 1) {
      cloneInviteBuidlerErrors['role'].error = true;
      cloneInviteBuidlerErrors['role'].errorMsg = 'Please select a role';
      setInviteBuidlerErrors({
        ...inviteBuidlerErrors,
        ...cloneInviteBuidlerErrors,
      });
      return;
    }
    if (selectedBuidler && projectRoleValue.length > 0) {
      let selectedBuidlerId = '';
      activeBuidlerList.forEach((buidler) => {
        if (buidler.name === selectedBuidler) {
          selectedBuidlerId = buidler.id;
        }
      });
      API.post(`/buidler/createInvitation`, {
        buidlerId: selectedBuidlerId,
        projectId: project?.id,
        projectRole: projectRoleValue,
      })
        .then((res) => {
          if (res?.data?.status === 'SUCCESS') {
            setAlert(
              'Invite buidler successfully, please wait for the buidler to accept the invitation',
              'success'
            );
          } else {
            setAlert(res?.data?.message, 'error');
          }
        })
        .catch((err) => {
          setAlert('something went wrong', 'error');
        });
    }
  };

  const handleAcceptInvitation = () => {
    API.post(`/buidler/joinProject`, currentBuidlerOnProjectInfo)
      .then((res) => {
        if (res?.data?.status === 'SUCCESS') {
          setAlert(
            'Congratulations on your successful participation in this project!',
            'success'
          );
          getProjectData();
          setShowAcceptButton(false);
        }
      })
      .catch((err) => {
        setAlert('something went wrong', 'error');
      });
  };

  const cardData = [
    {
      title: 'items',
      url: '',
      value: '1.0k',
    },
    {
      title: 'items',
      url: '',
      value: '1.0k',
    },
    {
      title: 'items',
      url: '/icons/eth.svg',
      value: '0.05',
    },
    {
      title: 'items',
      url: '/icons/eth.svg',
      value: '300',
    },
  ];
  const cardItem = (item, isRight) => {
    return (
      <Card
        sx={{
          minWidth: '172px',
          height: '132px',
          background: '#FFFFFF',
          border: '0.5px solid #D0D5DD',
          borderRadius: '6px',
          marginRight: isRight ? 3 : 0,
          marginBottom: 3,
          boxShadow: 'none',
          fontWeight: 600
        }}
      >
        <CardContent>
          <Typography textAlign="left" variant="body1" fontWeight="600">
            {item.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '32px',
              marginTop:'16px'
            }}
          >
            <img src={item.url} style={{ height: '100%' }} />
            <Typography sx={{ fontSize: '32px' }} fontWeight="600">
              {item.value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const forumdata = [
    {
      name: 'About the 000 GCLX category',
      operate: [
        { name: 'Views', num: 18 },
        { name: 'Replies', num: 0 },
        { name: 'Activity', num: '12d' },
      ],
    },
    {
      name: 'About the 000 GCLX category1',
      operate: [
        { name: 'Views', num: 18 },
        { name: 'Replies', num: 0 },
        { name: 'Activity', num: '13d' },
      ],
    },
  ];
  const operateItem = (item) => (
    <Box display="flex" gap="3px" marginRight={2}>
      <Typography variant="body2" marginRight={0.5} color="#666F85">
        {item.name}
      </Typography>
      <Typography color="#36AFF9" variant="body2">
        {item.num}
      </Typography>
    </Box>
  );
  const forumItem = (item) => (
    <Box
      sx={{
        padding: '22px 23px',
        width: '100%',
        height: '88px',
        background: '#FFFFFF',
        border: '0.5px solid #D0D5DD',
        borderRadius: '6px',
      }}
      marginBottom={2}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="body1" align="left" fontWeight={600}>
          {item.name}
        </Typography>
        <Box display="flex" alignItems="center">
          {item.operate.map((item_) => operateItem(item_))}
        </Box>
      </Box>
      <Typography color="#36AFF9" variant="subtitle1" fontWeight={600}>
        →
      </Typography>
    </Box>
  );

  if (!project) return null;
  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      // paddingX={{ md: 32, xs: 8 }}
      textAlign="center"
      id="Project-Detail-Section"
      maxWidth="1200px"
      minHeight="calc(100vh - 280px)"
      width="auto"
    >
      <Grid
        container
        spacing={4}
        flexDirection={{ md: 'row', xs: 'column' }}
        width={{ xs: '100%' }}
      >
        <Grid item md={4} lg={4} margin={{ xs: '0 auto' }}>
          <Box
            sx={{
              background: '#FFFFFF',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
              width: '100%',
              padding: 3,
            }}
          >
            <Link
              href={project?.links.website || ''}
              target="_blank"
              sx={{ position: 'relative' }}
            >
              <img
                style={{
                  width: '100%',
                  border:'1px solid #eee'
                }}
                src={project.logoLarge}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: '1px',
                  bottom: '0px',
                  background: '#36AFF9',
                  borderRadius: '2px',
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#fff',
                }}
                width={38}
                height={16}
              >
                {'#' + project.number}
              </Typography>
            </Link>
            <Typography variant="h5" fontWeight="600" marginTop={3}>{project.name}</Typography>
            <Box
              sx={{
                width: '100%',
                height: '0px',
                border: '0.5px solid #E5E5E5',
              }}
              marginTop={3}
              marginBottom={3}
            ></Box>
            <Typography align="left" variant="body1" color="#666F85">
              {project.description}
            </Typography>
            <Box
              align="left"
              display="flex"
              gap="5px"
              flexWrap="wrap"
              minHeight={'26px'}
            >
              {project.type &&
                project.type.map((type, index) => {
                  return (
                    <Chip
                      key={index}
                      size="small"
                      label={type}
                      variant="outlined"
                      sx={{
                        borderRadius: '4px',
                        borderColor: '#000000',
                        fontSize: '12px',
                      }}
                    />
                  );
                })}
            </Box>
            <Box display="flex" gap={4} flexWrap="wrap">
              {project.links &&
                Object.keys(project.links).map((key, index) => {
                  return (
                    <Typography
                      target="_blank"
                      component="a"
                      href={project.links[key]}
                      color="primary"
                      key={index}
                    >
                      <Box
                        width="20px"
                        component={'img'}
                        src={`/icons/${key}.svg`}
                      />
                    </Typography>
                  );
                })}
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '0px',
                border: '0.5px solid #E5E5E5',
              }}
              marginBottom={3}
              marginTop="26px"
            ></Box>
            <Stack direction="column" spacing={2} marginBottom={3}>
              {project.launchDate && (
                <Box display="flex" justifyContent="center">
                  <LabelText label="Launch Date" />
                  <Typography variant="body1" color="#101828" marginLeft={2}>
                    {format(new Date(project.launchDate), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
              )}
              <Box align="center">
                <Typography
                  fontSize={{ md: '14px', xs: '12px' }}
                  width="97px"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#4DCC9E',
                    background: 'rgba(77, 204, 158, 0.1)',
                    display: 'block',
                    lineHeight: '23.92px',
                  }}
                >
                  {PROJECT_STATUS[project.status]}
                </Typography>
              </Box>
            </Stack>
            {project?.isAbleToJoin && showJoinButton && (
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => {
                  setOpenJoinTooltip(false);
                }}
                open={openJoinTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Make sure you are a LXDAO buidler and connect your wallet first."
                marginTop={3}
              >
                <Box display="flex" width="180px" margin="auto">
                  <Button
                    width="100%"
                    variant="gradient"
                    onClick={handleBuidlerJoin}
                  >
                    Join this project
                  </Button>
                </Box>
              </Tooltip>
            )}
          </Box>
        </Grid>
        <Grid item md={8} lg={8} justify="flex-start">
          <Stack>
            <Box display="flex" flexWrap="wrap">
              {cardData.map((card, i) =>
                cardItem(card, i < cardData.length - 1)
              )}
            </Box>
            <Box
              sx={{
                width: '100%',
                minHeight: '146px',
                padding: '22px 32px',
                background: '#FFFFFF',
                border: '0.5px solid #D0D5DD',
                borderRadius: '6px',
              }}
              marginBottom={3}
            >
              <Typography variant="body1" fontWeight="600" marginBottom={2} textAlign="left">
                Buidlers
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex">
                  {project.buidlersOnProject.map((buidler, index) => {
                    return (
                      <Tooltip
                        key={index}
                        title={<BuidlerCard buidlerInfo={buidler} />}
                        open={buidler.showTooltip}
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={() =>
                          handleDisplayBuidlerTooltip(buidler, 'close')
                        }
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Link href={`/buidlers/${buidler?.buidler?.address}`}>
                          <Box
                            width="60px"
                            height="60px"
                            marginRight="10px"
                            position="relative"
                            sx={{
                              border: '0.5px solid #D0D5DD',
                              borderRadius: '2px',
                            }}
                          >
                            {buidler?.projectRole.includes(
                              'Project Manager'
                            ) && (
                              <Typography
                                position="absolute"
                                sx={{
                                  left: 0,
                                  top: 0,
                                  fontSize: '12px',
                                  lineHeight: '15px',
                                  color: '#fff',
                                  background: '#36AFF9',
                                  width: '30px',
                                  zIndex: 3,
                                }}
                              >
                                PM
                              </Typography>
                            )}
                            <Avatar
                              key={index}
                              alt={buidler?.buidler?.name}
                              src={buidler?.buidler?.avatar}
                              sx={{
                                cursor: 'pointer',
                                position: 'absolute',
                                zIndex: 2,
                                width: '100%',
                                height: '100%',
                              }}
                              onMouseOver={() =>
                                handleDisplayBuidlerTooltip(buidler, 'open')
                              }
                            />
                            {buidler.status == 'PENDING' && (
                              <Box
                                position="absolute"
                                width="100%"
                                height="100%"
                                sx={{
                                  background: 'rgba(0, 0, 0, 0.5)',
                                  borderRadius: '2px',
                                  top: 0,
                                  left: 0,
                                  zIndex: 3,
                                }}
                              ></Box>
                            )}
                          </Box>
                        </Link>
                      </Tooltip>
                    );
                  })}
                  {!showInviteButton && address && (
                    <Box
                      width="60px"
                      height="60px"
                      marginRight="10px"
                      position="relative"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        border: '0.5px solid #D0D5DD',
                        borderRadius: '2px',
                        color: '#D0D5DD',
                      }}
                      onClick={() => setShowInviteButton(true)}
                    >
                      <img src="/icons/add.svg" />
                    </Box>
                  )}
                </Box>
                {showAcceptButton && (
                  <Button variant="gradient" onClick={handleAcceptInvitation}>
                    Accept Invitation
                  </Button>
                )}
              </Box>

              {showInviteButton && (
                <Box marginTop={3} maxWidth="700px" display="flex" gap="10px">
                  <Autocomplete
                    sx={{ width: '300px', height: '56px' }}
                    options={activeBuidlerList.map((option) => option.name)}
                    onChange={(e, data) => {
                      setSelectedBuidler(data);
                      if (data) {
                        const cloneInviteBuidlerErrors = {
                          ...inviteBuidlerErrors,
                        };
                        cloneInviteBuidlerErrors['buidler'].error = false;
                        cloneInviteBuidlerErrors['buidler'].errorMsg = '';
                        setInviteBuidlerErrors({
                          ...inviteBuidlerErrors,
                          ...cloneInviteBuidlerErrors,
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Buidler"
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                        error={inviteBuidlerErrors['buidler'].error}
                        helperText={inviteBuidlerErrors['buidler'].errorMsg}
                      />
                    )}
                  />
                  <FormControl
                    sx={{ m: 1, width: 230, margin: 0 }}
                    error={inviteBuidlerErrors['role'].error}
                  >
                    <InputLabel id="project-role-multiple-checkbox-label">
                      Project Role
                    </InputLabel>
                    <Select
                      sx={{ width: '230px', height: '56px' }}
                      labelId="project-role-multiple-checkbox-label"
                      id="project-role-multiple-checkbox"
                      multiple
                      error={inviteBuidlerErrors['role'].error}
                      value={projectRoleValue}
                      MenuProps={MenuProps}
                      onChange={(event) => {
                        setProjectRoleValue(event.target.value);
                        if (event.target.value) {
                          const cloneInviteBuidlerErrors = {
                            ...inviteBuidlerErrors,
                          };
                          cloneInviteBuidlerErrors['role'].error = false;
                          cloneInviteBuidlerErrors['role'].errorMsg = '';
                          setInviteBuidlerErrors({
                            ...inviteBuidlerErrors,
                            ...cloneInviteBuidlerErrors,
                          });
                        }
                      }}
                      input={<OutlinedInput label="Project Role" />}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {projectRoleList.map((role) => (
                        <MenuItem key={role} value={role}>
                          <Checkbox
                            checked={projectRoleValue.indexOf(role) > -1}
                          />
                          <ListItemText primary={role} />
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {inviteBuidlerErrors['role'].errorMsg}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    variant="gradient"
                    onClick={handleInviteBuidler}
                    height="56px"
                  >
                    Invite
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                padding: 4,
                background: '#FFFFFF',
                border: '0.5px solid #D0D5DD',
                borderRadius: '6px',
              }}
            >
              <Typography variant="body1" fontWeight="600" marginBottom={2} textAlign="left">
                Forum
              </Typography>
              <Box>
                {forumdata && forumdata.map((forum) => forumItem(forum))}
              </Box>
              <Box
                width="200px"
                height="48px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                margin="auto"
                fontWeight={500}
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid #D0D5DD',
                  /* Shadow/xs */
                  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                  borderRadius: '6px',
                }}
              >
                View More
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={openJoinDialog}
        title="Want to join this project?"
        content={
          <Box>
            Please contact with the Project Manager:{' '}
            <Link href={`/buidlers/${projectManagerAddress}`} target="_blank">
              {projectManagerName}
            </Link>
            .
          </Box>
        }
        confirmText="OK"
        variant="gradient"
        handleClose={() => {
          setOpenJoinDialog(false);
        }}
        handleConfirm={() => {
          setOpenJoinDialog(false);
        }}
      />
    </Container>
  );
};

export default SectionProjectDetail;
