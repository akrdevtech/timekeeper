import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react'
import SideAppDrawer from './components/common/SideAppDrawer';
import StudentManager from "./pages/studentManager";
import StudentStore from './pages/studentManager/Store';
import { Routes, Route } from 'react-router-dom';

//https://codereview.stackexchange.com/questions/256457/alarm-clock-with-react-js
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: "#4742D7"
    },
    secondary: {
      main: "#00C492"
    },
    success: {
      main: "#0CF631"
    },
    error: {
      main: "#F60C0C"
    },
    text: {
      primary: "#191E3E",
      secondary: "#999999"
    },
    lightTheme: {
      backgroundColor: "#F5F8FB"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: theme.palette.lightTheme.backgroundColor }}>
        <SideAppDrawer >
          <StudentStore>
            <Routes>
              <Route path="/" element={<>Dashboard</>} />
              <Route path="/students" element={<StudentManager />} />
              <Route path="/courses" element={<>course manger</>} />
            </Routes>
          </StudentStore>
        </SideAppDrawer >
      </div>
    </ThemeProvider >
  );
}

export default App;
