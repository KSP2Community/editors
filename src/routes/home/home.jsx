import {Card, CardContent, Typography, Box} from '@mui/joy'
import { NavLink } from "react-router-dom"

export default function Home() {
  const cardStyles = {
    transition: 'all 0.2s ease',
    '&:hover': {
      bgcolor: 'primary.plainHoverBg',
    },
    height: '100%'
  }

  const availableEditors = [
    { title: "Mission editor", description: "Create your own missions or edit existing ones.", link: "/missions" },
  ]

  const plannedEditors = [
    { title: "swinfo.json editor", description: "Used to create SpaceWarp mod information files." },
    { title: "Experiment editor", description: "Create custom science experiments." },
  ]

  return (
    <Box sx={{
      marginX: 'auto',
      maxWidth: '1200px',
      padding: '1rem',
    }}>
      <Typography level="h1" sx={{
        marginBottom: '1rem'
      }}>KSP2 Editor Suite</Typography>
      <Typography level="body-md" sx={{
        marginBottom: '1rem'
      }}>A suite of content editors for Kerbal Space Program 2 modding.</Typography>
      <Typography level="body-sm" sx={{
        marginBottom: '2rem'
      }}>This website is currently under development and not guaranteed to work.</Typography>
      <Typography level="h3" gutterBottom>Available</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        alignItems: 'stretch',
        marginBottom: '2rem'
      }}>
        {availableEditors.map((card, index) => (
          <NavLink key={index} to={card.link} style={{ textDecoration: 'none' }}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography level="h4">{card.title}</Typography>
                <Typography level="body-md">{card.description}</Typography>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </Box>
      <Typography level="h3" gutterBottom>Planned</Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        alignItems: 'stretch'
      }}>
        {plannedEditors.map((card, index) => (
          <Card key={index} sx={{
            height: '100%',
            bgcolor: 'primary.solidDisabledBg',
          }}>
            <CardContent>
              <Typography level="h4" sx={{
                color: 'primary.solidDisabledColor'
              }}>{card.title}</Typography>
              <Typography level="body-md" sx={{
                color: 'primary.solidDisabledColor'
              }}>{card.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}