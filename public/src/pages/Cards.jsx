import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <h1>Yey! Nitesh👋👋👋👋👋</h1>
        <img src="https://www.koimoi.com/wp-content/new-galleries/2022/06/thor-star-chris-hemsworth-reveals-his-reaction-to-knowing-he-bagged-the-mcu-role-001.jpg" alt="img" width={500}/>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
