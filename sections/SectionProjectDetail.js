import React, { useContext, useEffect, useState } from 'react';

import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import BuidlerCard from '@/components/BuidlerCard';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Dialog from '@/components/Dialog';
import showMessage from '@/components/showMessage';

import { useAccount } from 'wagmi';

import API from '@/common/API';
import { AlertContext } from '@/context/AlertContext';
import { WorkDetailItem } from '@/sections/SectionWorkSteps';
import { getLocalStorage } from '@/utils/utility';

import { format } from 'date-fns';

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
  const [showInviteSearchButton, setShowInviteSearchButton] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
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
  const [projectForumList, setProjectForumList] = useState([]);
  const [projectPMInfo, setProjectPMInfo] = useState({});

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
    'Product Manager',
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

  const sentEmailToProjectManager = (targetEmailAddress) => {
    const subject = `Builder asks to join ${project?.name} project`;
    const body = `<p>Hi ${projectManagerName},</p><p>There is a request from Builder(<a href=${`https://lxdao.io/buidlers/${address}`} target="_blank">${address}</a>) to join ${
      project?.name
    } project. If it is approved, invite the Member to join the project on the details page. If it is denied, get in touch with the Member and let them know why.</p>
    <p>This is an official email from <a href="https://lxdao.io">LXDAO</a>.</p>
    <br><br>
    <p>Kind Regards,</p>
    <p>LXDAO</p>`;
    API.post(`/email/sendEmail`, {
      to: targetEmailAddress, // need rewrite by PM email
      subject,
      body,
    })
      .then(() => {})
      .catch((err) => {
        // setAlert('something went wrong', 'error');
        showMessage({
          type: 'error',
          title: 'Failed to send email to PM',
          body: err.message,
        });
      });
  };

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

  useEffect(() => {
    if (project?.links?.forum) {
      const forumLinkSplitArray = project?.links?.forum.split('/');
      const forumSlug = forumLinkSplitArray.slice(
        forumLinkSplitArray.length - 2,
        forumLinkSplitArray.length - 1
      );

      API.get(`/project/${forumSlug}/topics.json`)
        .then((res) => {
          if (res?.data?.data) {
            setProjectForumList(res?.data?.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [project]);

  const getBuidlersData = (project) => {
    let query = `/buidler?`;
    const params = [];
    params.push('status=ACTIVE&status=PENDING&status=READYTOMINT');
    params.push(`memberFirstBadge=1`);
    params.push(`page=1`);
    params.push(`per_page=999`);
    query += params.join('&');

    API.get(query)
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
            projectName: project?.name,
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

        //save the PM Buider info
        if (buidler?.projectRole.includes('Project Manager')) {
          setProjectPMInfo(buidler?.buidler);
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
        lineHeight="24px"
        color="#666F85"
        textAlign="left"
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
      sentEmailToProjectManager(projectPMInfo?.privateContacts?.email);
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
      setInviteLoading(false);
      return;
    }
    if (projectRoleValue.length < 1) {
      cloneInviteBuidlerErrors['role'].error = true;
      cloneInviteBuidlerErrors['role'].errorMsg = 'Please select a role';
      setInviteBuidlerErrors({
        ...inviteBuidlerErrors,
        ...cloneInviteBuidlerErrors,
      });
      setInviteLoading(false);
      return;
    }
    if (selectedBuidler && projectRoleValue.length > 0) {
      let selectedBuidlerId = '';
      let privateContacts = null;
      activeBuidlerList.forEach((buidler) => {
        if (buidler.name === selectedBuidler) {
          selectedBuidlerId = buidler.id;
          privateContacts = buidler.privateContacts;
        }
      });
      API.post(`/buidler/createInvitation`, {
        buidlerId: selectedBuidlerId,
        projectId: project?.id,
        projectRole: projectRoleValue,
        privateContacts,
      })
        .then((res) => {
          setInviteLoading(false);
          if (res?.data?.status === 'SUCCESS') {
            getProjectData();
            setAlert(
              'Invite member successfully, please wait for the member to accept the invitation',
              'success'
            );
          } else {
            setAlert(res?.data?.message, 'error');
          }
        })
        .catch(() => {
          setInviteLoading(false);
          setAlert('something went wrong', 'error');
        });
    }
  };

  const handleAcceptInvitation = () => {
    API.post(`/buidler/joinProject`, currentBuidlerOnProjectInfo)
      .then((res) => {
        setAcceptLoading(false);
        if (res?.data?.status === 'SUCCESS') {
          setAlert(
            'Congratulations on your successful participation in this project!',
            'success'
          );
          getProjectData();
          setShowAcceptButton(false);
        }
      })
      .catch(() => {
        setAcceptLoading(false);
        setAlert('something went wrong', 'error');
      });
  };

  // TODO: add the project data
  // const cardItem = (item) => {
  //   return (
  //     <Card
  //       sx={{
  //         minWidth: '172px',
  //         height: '132px',
  //         background: '#FFFFFF',
  //         border: '0.5px solid #D0D5DD',
  //         borderRadius: '6px',
  //         boxShadow: 'none',
  //         fontWeight: 600,
  //       }}
  //     >
  //       <CardContent>
  //         <Typography
  //           textAlign="left"
  //           variant="body1"
  //           fontWeight="600"
  //           textTransform="capitalize"
  //           color="#101828"
  //         >
  //           {item.title}
  //         </Typography>
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             height: '32px',
  //             marginTop: '16px',
  //           }}
  //         >
  //           <img
  //             src={item.url}
  //             style={{ height: '100%', left: '-6px', position: 'relative' }}
  //           />
  //           <Typography sx={{ fontSize: '32px' }} fontWeight="600">
  //             {item.value}
  //           </Typography>
  //         </Box>
  //       </CardContent>
  //     </Card>
  //   );
  // };

  if (!project) return null;
  return (
    <Container
      paddingY={{ md: 12, xs: 8 }}
      textAlign="center"
      id="Project-Detail-Section"
      maxWidth="1200px"
      minHeight="calc(100vh - 280px)"
      width="auto"
      display="flex"
      justifyContent="center"
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
              href={project?.links?.website || ''}
              target="_blank"
              sx={{
                position: 'relative',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              <Box
                component="img"
                src={project.logoLarge || '/images/placeholder.jpeg'}
                style={{
                  width: '100%',
                  border: '0.5px solid #D0D5DD',
                  borderRadius: '6px',
                }}
              />
              <Typography
                sx={{
                  position: 'absolute',
                  left: 0,
                  bottom: '6.5px',
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
            <Typography
              variant="h5"
              fontWeight="600"
              marginTop={3}
              lineHeight="28px"
            >
              {project.name}
            </Typography>
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
                        maxWidth="20px"
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
                  <Typography
                    variant="body1"
                    lineHeight="24px"
                    color="#101828"
                    fontWeight={600}
                    marginLeft={2}
                  >
                    {format(new Date(project.launchDate), 'yyyy-MM-dd')}
                  </Typography>
                </Box>
              )}
              <Box align="center">
                <Typography
                  fontSize={{ md: '14px', xs: '12px' }}
                  sx={{
                    alignItems: 'center',
                    color: '#4DCC9E',
                    background: 'rgba(77, 204, 158, 0.1)',
                    display: 'initial',
                    lineHeight: '23.92px',
                    padding: '4px 12px',
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
            {/* <Box
              display="flex"
              flexWrap="wrap"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              gap={{ xs: 1, md: 3 }}
              marginBottom={3}
            >
              {cardData.map((card, i) =>
                cardItem(card, i < cardData.length - 1)
              )}
            </Box> */}
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
              <Typography
                variant="body1"
                fontWeight="600"
                marginBottom={2}
                textAlign="left"
              >
                Members
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" flexWrap="wrap" gap="10px">
                  {project.buidlersOnProject
                    .sort((a, b) => {
                      if (a.projectRole.includes('Project Manager')) return -1;
                      if (b.projectRole.includes('Project Manager')) return 1;
                      return 0;
                    })
                    .map((buidler, index) => {
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
                              <Box
                                onMouseOver={() =>
                                  handleDisplayBuidlerTooltip(buidler, 'open')
                                }
                              >
                                <Box
                                  component="img"
                                  src={buidler?.buidler?.avatar}
                                  alt="avatar"
                                  style={{
                                    width: '59px',
                                    height: '59px',
                                  }}
                                />
                              </Box>

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
                  {showInviteButton && !showInviteSearchButton && address && (
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
                      onClick={() => setShowInviteSearchButton(true)}
                    >
                      <img src="/icons/add.svg" />
                    </Box>
                  )}
                </Box>
                {showAcceptButton && (
                  <Button
                    variant="gradient"
                    onClick={handleAcceptInvitation}
                    loading={acceptLoading}
                  >
                    {acceptLoading ? 'loading...' : 'Accept Invitation'}
                  </Button>
                )}
              </Box>

              {showInviteSearchButton && (
                <Box
                  marginTop={3}
                  maxWidth="700px"
                  display="flex"
                  gap="10px"
                  flexWrap="wrap"
                >
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
                        label="Search Member"
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
                      textAlign="left"
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
                    onClick={inviteLoading ? () => {} : handleInviteBuidler}
                    height="56px"
                    loading={inviteLoading}
                    loadingPosition="start"
                  >
                    {inviteLoading ? 'loading...' : 'Invite'}
                  </Button>
                </Box>
              )}
            </Box>
            {project?.links?.forum && (
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
                <Typography
                  variant="body1"
                  fontWeight="600"
                  marginBottom={2}
                  textAlign="left"
                >
                  Forum
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {projectForumList &&
                    projectForumList.map((forum, index) => {
                      return (
                        <WorkDetailItem
                          width="100%"
                          border="0.5px solid #D0D5DD"
                          borderRadius="6px"
                          type="idea"
                          data={forum}
                          key={index}
                        />
                      );
                    })}
                </Box>
                <Link
                  href={project?.links?.forum}
                  target="_blank"
                  sx={{ textDecoration: 'none', color: '#0D1320' }}
                >
                  <Button
                    variant="outlined"
                    width="200px"
                    margin="0 auto"
                    marginTop={3}
                  >
                    View More
                  </Button>
                </Link>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Dialog
        open={openJoinDialog}
        title="Want to join this project?"
        content={
          <Box>
            Email has been sent to PM, PM will contact you by email later
            <Link href={`/buidlers/${projectManagerAddress}`} target="_blank">
              {projectManagerName}
            </Link>
            .
          </Box>
        }
        confirmText="Confirm"
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
