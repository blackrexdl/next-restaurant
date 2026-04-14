"use client";

import React from "react";
import styled from "styled-components";

export default function Loader() {
  return (
    <Overlay>
      <StyledWrapper>
        <div className="loader">
          <div className="box">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg">
                <path d="M4 12c0-2 4-4 8-4s8 2 8 4-4 4-8 4-8-2-8-4zm2 3c1.5 1 4 2 6 2s4.5-1 6-2v2c0 2-3 4-6 4s-6-2-6-4v-2zm11-6 4-2" />
                <path d="M7 4c0-1 1-2 2-2s2 1 2 2" />
                <path d="M11 4c0-1 1-2 2-2s2 1 2 2" />
                <path d="M15 4c0-1 1-2 2-2s2 1 2 2" />
              </svg>
            </div>
          </div>
          <div className="box" />
          <div className="box" />
          <div className="box" />
          <div className="box" />
        </div>
        <Brand>Dine@flow</Brand>
      </StyledWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(12px);
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  .loader {
    --size: 180px;
    --duration: 2s;
    --logo-color: #bbb;
    --background: linear-gradient(
      0deg,
      rgba(255,255,255,0.08) 0%,
      rgba(255,255,255,0.04) 100%
    );
    height: var(--size);
    aspect-ratio: 1;
    position: relative;
  }

  .loader .box {
    position: absolute;
    background: var(--background);
    border-radius: 50%;
    border-top: 1px solid rgba(255,255,255,0.6);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 12px 16px -2px;
    backdrop-filter: blur(6px);
    animation: ripple var(--duration) infinite ease-in-out;
  }

  .loader .box:nth-child(1) { inset: 40%; z-index: 99; }
  .loader .box:nth-child(2) { inset: 30%; z-index: 98; border-color: rgba(255,255,255,0.5); animation-delay: 0.2s; }
  .loader .box:nth-child(3) { inset: 20%; z-index: 97; border-color: rgba(255,255,255,0.4); animation-delay: 0.4s; }
  .loader .box:nth-child(4) { inset: 10%; z-index: 96; border-color: rgba(255,255,255,0.3); animation-delay: 0.6s; }
  .loader .box:nth-child(5) { inset: 5%;  z-index: 95; border-color: rgba(255,255,255,0.2); animation-delay: 0.8s; }

  .loader .logo {
position: absolute;
inset: 0;
display: grid;
place-content: center;
padding: 22%;
}

 .loader .logo svg {
fill: var(--logo-color);
width: 100%;
filter: drop-shadow(0 0 8px rgba(255,107,61,0.6));
animation: color-change var(--duration) infinite ease-in-out, pulse 2s infinite ease-in-out;
color: #ff6b3d;
}

  @keyframes ripple {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
    @keyframes pulse {
0% { transform: scale(1); }
50% { transform: scale(1.1); }
100% { transform: scale(1); }
}

  @keyframes color-change {
    0% { fill: var(--logo-color); }
    50% { fill: #fff; }
    100% { fill: var(--logo-color); }
  }
`;

const Brand = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;