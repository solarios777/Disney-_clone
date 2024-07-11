import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../feature/user/userSlice";
import { NavLink, Outlet } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const useremail = useSelector(selectUserEmail);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [username]);

  const handleauth = async (props) => {
    try {
      if (!useremail) {
        const result = await signInWithPopup(auth, provider);
        setUser(result.user);
      } else {
        await signOut(auth);
        dispatch(setSignOutState());
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.dispalyName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };
  return (
    <>
      <Nav>
        <Logo>
          <img src="/images/logo.svg" alt="Disney+" />
        </Logo>
        {!useremail ? (
          <Login onClick={handleauth}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <NavLink to="/home">
                <img src="/images/home-icon.svg" alt="home" />
                <span>HOME</span>
              </NavLink>
              <NavLink to="/home">
                <img src="/images/search-icon.svg" alt="search" />
                <span>SEARCH</span>
              </NavLink>
              <NavLink to="/home">
                <img src="/images/watchlist-icon.svg" alt="watchlist" />
                <span>WATCHLIST</span>
              </NavLink>
              <NavLink to="/home">
                <img src="/images/original-icon.svg" alt="originals" />
                <span>ORIGINALS</span>
              </NavLink>
              <NavLink to="/home">
                <img src="/images/movie-icon.svg" alt="movies" />
                <span>MOVIES</span>
              </NavLink>
              <NavLink to="/home">
                <img src="/images/series-icon.svg" alt="series" />
                <span>SERIES</span>
              </NavLink>
            </NavMenu>
            <SignOut>
              <UserImg src={userphoto} alt={username} />
              <DropDown>
                <span onClick={handleauth}>Sign out</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </Nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;
const Logo = styled.a`
  padding: o;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &::before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scale(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const UserImg = styled.img`
  height: 100%;
`;
const Login = styled.a`
cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;


export default Header;
