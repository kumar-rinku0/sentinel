import * as React from 'react';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MsgContext = React.createContext();


export const MsgProvider = ({ children }) => {
  const [alert, setAlert] = React.useState([null, null, false]);
  const AlertMsg = () => {
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlert([null, null, false]);
    };
    function SlideTransition(props) {
      return <Slide {...props} direction="down" />;
    }

    return (
      <div>
        <Snackbar open={alert[2]} autoHideDuration={3000} onClose={handleClose} TransitionComponent={SlideTransition} key={SlideTransition.name} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert
            onClose={handleClose}
            severity={`${alert[1]}`}
            variant="filled"
          >
            {alert[0]}
          </Alert>
        </Snackbar>
      </div>
    );
  }
  return (
    <MsgContext.Provider value={{ setAlert }}>
      <AlertMsg />
      {children}
    </MsgContext.Provider>
  )
}


export const useMsg = () => {
  return React.useContext(MsgContext);
} 