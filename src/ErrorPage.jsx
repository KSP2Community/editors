// Function to map error codes to user-friendly messages and titles
import {useNavigate, useRouteError} from "react-router-dom";
import {Button, Card, Typography} from "@mui/joy";

function getErrorDetails(error) {
  switch (error.status) {
    case 404:
      return {
        title: 'Page Not Found',
        message: 'The page you were trying to reach could not be found. It might have been removed, renamed, or did not exist in the first place.'
      };
    case 500:
      return {
        title: 'Internal Server Error',
        message: 'We\'re sorry, but an internal server error has occurred. We are working to fix this issue.'
      };
    case 403:
      return {
        title: 'Access Denied',
        message: 'You do not have the necessary permissions to access this page. Please check your credentials or contact your administrator.'
      };
    default:
      return {
        title: 'Unexpected Error',
        message: 'An unexpected error has occurred. Please try again later.'
      };
  }
}

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { title, message } = getErrorDetails(error);

  return (
    <Card sx={{ maxWidth: 800, m: 'auto', mt: 10, p: 2 }}>
      <Typography level="h4" gutterBottom sx={{
        textAlign: 'center',
      }}>
        {title}
      </Typography>
      <Typography level="body-lg" gutterBottom>
        {message}
      </Typography>
      <Button variant="soft" onClick={() => navigate('/')} sx={{
        m: 'auto',
      }}>
        Return to Home
      </Button>
    </Card>
  );
}