import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import '../styles/carousel.css'
import '../styles/app.css'
import { useSelector } from 'react-redux';

const steps = [
  {
    label: 'Select campaign settings',
    description: `https://imdb-api.com/images/original/MV5BZmI4MjYwMzktNmI5NC00NzFlLThiMGUtOGNkNTA1MDM2MzZiXkEyXkFqcGdeQXVyMTMzOTcwMjEw._V1_Ratio1.7653_AL_.jpg`,
  },
  {
    label: 'Create an ad group',
    description:
      'https://imdb-api.com/images/original/MV5BYWJmOTFmNzUtNmI4Zi00YzU1LTgwMDUtZjY5MDZmOTdlZTYyXkEyXkFqcGdeQXVyMzExNjk1MDU@._V1_Ratio1.7653_AL_.jpg',
  },
  {
    label: 'Create an ad',
    description: `https://imdb-api.com/images/original/MV5BMTU4ODg1ODgzNl5BMl5BanBnXkFtZTgwMTEyNDc1MDE@._V1_Ratio0.6837_AL_.jpg`,
  },
];

export default function TextMobileStepper() {

  const movies = useSelector((state) => state.movies)

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className='container-slider' sx={{ flexGrow: 1 }}>
      <Box sx={{ width: '100%', p: 2, display: 'flex', justifyContent: 'center', background: 'black' }}>
        <img src={steps[activeStep].description} alt="" className='img-carousel'/>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className='bg'
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

