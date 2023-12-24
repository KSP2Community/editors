import {Box, Button, IconButton, Stack, Tooltip, useColorScheme} from '@mui/joy'
import {FiHome, FiMoon, FiSun} from 'react-icons/fi'
import React from 'react'

function ColorSchemeToggle() {
  const {mode, setMode} = useColorScheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
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
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            borderRadius: '50%',
          }}
        >
          <FiHome/>
        </IconButton>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/"
          size="sm"
          sx={{alignSelf: 'center'}}
        >
          Mission editor
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="false"
          component="a"
          href="/swinfo"
          size="sm"
          sx={{alignSelf: 'center'}}
        >
          swinfo.json
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <ColorSchemeToggle/>
      </Stack>
    </Box>
  )
}