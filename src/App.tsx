import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import {AuthProvider} from "./components/context/AuthContext";
import Dashboard from "./components/pages/dashboard";
import { ModalCreateProvider } from "./components/context/ModalCreateContext";
import { ModalViewProvider } from "./components/context/ModalViewContext";
import { Toaster } from "sonner";
import { CircleCheck, CircleX, TriangleAlert } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ModalCreateProvider>          
            <ModalViewProvider>
              <Toaster
                duration={1500}
                position="top-center"
                toastOptions={{
                  classNames:{
                    toast:'border-none text-black',
                    success:'bg-green-500',
                    warning:'bg-yellow-500',
                    error:'bg-red-500',
                  }
                }}
                icons={{
                  success: <CircleCheck color="black"/>,
                  warning: <TriangleAlert color="black"/>,
                  error: <CircleX color="black"/>,
                }}
              />
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
              </Routes>
            </ModalViewProvider>
          </ModalCreateProvider>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
