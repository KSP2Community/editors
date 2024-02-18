import {Box, Button, IconButton, Stack, Tooltip, Typography, useColorScheme} from '@mui/joy'
import {FiHome, FiMoon, FiSun} from 'react-icons/fi'
import {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

function ColorSchemeToggle() {
  const {mode, setMode} = useColorScheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary"/>
  }
  return (
    <Tooltip title="Change theme">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{alignSelf: 'center'}}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark')
          } else {
            setMode('light')
          }
        }}
      >
        {mode === 'light' ? <FiMoon/> : <FiSun/>}
      </IconButton>
    </Tooltip>
  )
}

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Tooltip title="Homepage">
            <IconButton
              size="md"
              variant="outlined"
              color="neutral"
              sx={{
                borderRadius: '50%',
                '&.active': {
                  bgcolor: 'primary.softActiveBg'
                }
              }}
              component={NavLink}
              to="/"
            >
              <FiHome/>
            </IconButton>
          </Tooltip>
          <Button
            variant="plain"
            color="neutral"
            component={NavLink}
            to="/missions"
            size="sm"
            sx={{
              alignSelf: 'center',
              '&.active': {
                bgcolor: 'primary.softActiveBg'
              }
            }}
          >
            Mission editor
          </Button>
          <Button
            variant="plain"
            color="neutral"
            aria-pressed="false"
            component={NavLink}
            to="/swinfo"
            size="sm"
            sx={{
              alignSelf: 'center',
              '&.active': {
                bgcolor: 'primary.softActiveBg'
              }
            }}
          >
            swinfo.json
          </Button>
        </Stack>
      </Box>
      <Typography variant="h2" level="h4" sx={{
        flexGrow: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <ColorSchemeToggle/>
        </Stack>
      </Box>
    </Box>
  )
}