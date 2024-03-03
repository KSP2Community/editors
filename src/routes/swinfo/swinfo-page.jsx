import {Box, Card, Typography} from "@mui/joy";

export default function SwinfoPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          gridArea: 'side',
          padding: '1rem',
          width: '100%',
          maxWidth: '1200px',
        }}>
        <Typography level="h4" component="h2">swinfo.json editor</Typography>
        <Typography level="body-md">
          This is just a placeholder page for the swinfo.json editor. It&apos;s not implemented yet.
        </Typography>
        <Typography level="body-md">
          Please check back later.
        </Typography>
      </Card>
    </Box>
  )
}