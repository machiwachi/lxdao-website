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
  Link,
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
          <Link href={project?.links.website || ''} target="_blank">
            <img
              style={{
                width: '100%',
                boxShadow: '0px 4px 10px 3px rgba(0, 0, 0, 0.04)',
              }}
              src={project.logoLarge}
            />
          </Link>
        </Grid>
        <Grid item md={8} justify="flex-start">
          <Stack spacing={3.5}>
            <Box
              display={{ md: 'none', xs: 'flex' }}
              alignItems="flex-end"
              gap="12px"
            >
              <Link href={project?.links.website || ''} target="_blank">
                <img style={{ width: '50px' }} src={project.logoLarge} />
              </Link>
              <Link
                href={project?.links.website || ''}
                target="_blank"
                sx={{ textDecoration: 'none' }}
              >
                <Typography variant="h5" align="left">
                  {project.name}
                </Typography>
              </Link>
            </Box>
            <Link
              href={project?.links.website || ''}
              target="_blank"
              sx={{ textDecoration: 'none' }}
            >
              <Typography
                variant="h4"
                align="left"
                display={{ md: 'block', xs: 'none' }}
              >
                {project.name}
              </Typography>
            </Link>
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
                          <Link href={`/buidlers/${buidler?.buidler?.address}`}>
                            <Avatar
                              key={index}
                              alt={buidler?.buidler?.name}
                              src={buidler?.buidler?.avatar}
                              sx={{
                                cursor: 'pointer',
                              }}
                              onMouseOver={() =>
                                handleDisplayBuidlerTooltip(buidler, 'open')
                              }
                            />
                          </Link>

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
              <Stack direction="column" spacing={1} alignItems="flex-start">
                <Typography>Invitate builder to join this project:</Typography>
                <Box display="flex" gap="10px">
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
                <Box display="flex" width="180px">
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
