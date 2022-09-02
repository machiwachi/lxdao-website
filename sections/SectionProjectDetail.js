import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  Autocomplete,
  TextField,
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
  const [currentBuidlerOnProjectInfo, setCurrentBuidlerOnProjectInfo] =
    useState({ id: null, ipfsURI: '' });

  const useAlert = () => useContext(AlertContext);
  const { setAlert } = useAlert();
  const { address } = useAccount();
  const classes = useStyles();

  const PROJECT_STATUS = {
    WIP: 'WORK IN PROGRESS',
    LAUNCHED: 'LAUNCHED',
  };

  let projectManagerName = '';
  project?.buidlersOnProject.forEach((buidler) => {
    if (buidler?.projectRole.includes('Project Manager')) {
      projectManagerName = buidler?.buidler?.name;
    }
  });

  const getProjectData = () => {
    API.get(`/project/${projectId}`)
      .then((res) => {
        if (res?.data?.data) {
          setProject(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    API.get(`/buidler/list`)
      .then((res) => {
        if (res?.data?.data) {
          const activeBuidlers = [];
          const buidlerIdsOnProject = [];
          project?.buidlersOnProject.forEach((buidlerOnProject) => {
            buidlerIdsOnProject.push(buidlerOnProject?.buidler?.id);
          });
          res?.data?.data?.forEach((buidler) => {
            let buidlerActiveOnProject = false;
            buidler?.projects.forEach((buidlerOnProject) => {
              if (
                buidlerOnProject?.id === project?.id &&
                buidlerOnProject?.status === 'ACTIVE'
              ) {
                buidlerActiveOnProject = true;
              }
            });
            if (
              buidler.status === 'ACTIVE' &&
              !buidlerIdsOnProject.includes(buidler.id) &&
              buidlerActiveOnProject
            ) {
              activeBuidlers.push(buidler);
            }
          });
          setActiveBuidlerList(activeBuidlers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [project]);

  useEffect(() => {
    if (address) {
      let count = 0;
      project?.buidlersOnProject.forEach((buidler) => {
        if (buidler?.buidler?.address === address) {
          count++;
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
          setShowInviteButton(true);
        }
      });
      setShowJoinButton(!count);
    } else {
      setShowJoinButton(true);
      setShowInviteButton(false);
    }
  }, [address, project]);

  const LabelText = ({ label }) => {
    return (
      <Typography
        color="#666F85"
        fontSize="16px"
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
    if (selectedBuidler) {
      let selectedBuidlerId = '';
      activeBuidlerList.forEach((buidler) => {
        if (buidler.name === selectedBuidler) {
          selectedBuidlerId = buidler.id;
        }
      });
      API.post(`/buidler/createInvitation`, {
        buidlerId: selectedBuidlerId,
        projectId: project?.id,
      })
        .then((res) => {
          if (res?.data?.status === 'SUCCESS') {
            setAlert(
              'Invite buidler successfully, please wait for the buidler to accept the invitation',
              'success'
            );
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

  if (!project) return null;

  return (
    <Container
      paddingY={{ md: '96px', xs: 8 }}
      textAlign="center"
      id="Project-Detail-Section"
      maxWidth="1200px"
      minHeight="calc(100vh - 280px)"
    >
      <Grid container spacing={4}>
        <Grid item xs={4} display={{ md: 'block', xs: 'none' }}>
          <img
            style={{
              width: '100%',
              boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
            }}
            src={project.logoLarge}
          />
        </Grid>
        <Grid item md={8} justify="flex-start">
          <Stack spacing={3.5}>
            <Box
              display={{ md: 'none', xs: 'flex' }}
              alignItems="flex-end"
              gap="12px"
            >
              <img style={{ width: '50px' }} src={project.logoLarge} />
              <Typography variant="h5" align="left">
                {project.name}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              align="left"
              display={{ md: 'block', xs: 'none' }}
            >
              {project.name}
            </Typography>
            <Typography align="left">{project.description}</Typography>
            <Box align="left" display="flex" gap="5px" flexWrap="wrap">
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
            {project?.buidlersOnProject?.length > 0 && (
              <Box align="left">
                <LabelText label="Buidlers" />
                <Stack direction="row" spacing={2}>
                  {project.buidlersOnProject.map((buidler, index) => {
                    if (buidler.status !== 'ACTIVE') {
                      return null;
                    }
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
                        <Box position="relative">
                          <Avatar
                            key={index}
                            alt={buidler?.buidler?.name}
                            src={buidler?.buidler?.image}
                            sx={{
                              cursor: 'pointer',
                            }}
                            onMouseOver={() =>
                              handleDisplayBuidlerTooltip(buidler, 'open')
                            }
                          />
                          {buidler?.projectRole.includes('Project Manager') && (
                            <Box
                              width="30px"
                              height="12px"
                              color="#ffffff"
                              backgroundColor="rgba(41,117,223)"
                              fontSize="8px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              position="absolute"
                              right="4px"
                              bottom="-15px"
                            >
                              PM
                            </Box>
                          )}
                        </Box>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Box>
            )}
            {showInviteButton && (
              <Stack direction="row" spacing={2} marginTop={2}>
                <Autocomplete
                  sx={{ width: '300px' }}
                  freeSolo
                  disableClearable
                  options={activeBuidlerList.map((option) => option.name)}
                  onChange={(e, data) => {
                    setSelectedBuidler(data);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Buidler"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
                <Button variant="gradient" onClick={handleInviteBuidler}>
                  Invite
                </Button>
              </Stack>
            )}
            {showAcceptButton && (
              <Box display="flex">
                <Button variant="gradient" onClick={handleAcceptInvitation}>
                  Accept Invitation
                </Button>
              </Box>
            )}
            <Stack direction="row" spacing={8}>
              {project.launchDate && (
                <Box align="left">
                  <LabelText label="Launch Date" />
                  <Typography
                    fontSize={{ md: '20px', xs: '18px' }}
                    color="#000000"
                  >
                    {format(new Date(project.launchDate), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
              )}
              <Box align="left">
                <LabelText label="Status" />
                <Typography
                  fontSize={{ md: '20px', xs: '18px' }}
                  color="#000000"
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
              >
                <Box display="flex" width="100px">
                  <Button
                    width="100%"
                    variant="gradient"
                    onClick={handleBuidlerJoin}
                  >
                    Join
                  </Button>
                </Box>
              </Tooltip>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={openJoinDialog}
        title="Join this project"
        content={`Contact with the Project Manager(${projectManagerName}) of this project to apply.`}
        confirmText="OK"
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
