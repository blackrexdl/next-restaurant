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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 94 94" className="svg">
                <path d="M38.0481 4.82927C38.0481 2.16214 40.018 0 42.4481 0H51.2391C53.6692 0 55.6391 2.16214 55.6391 4.82927V40.1401C55.6391 48.8912 53.2343 55.6657 48.4248 60.4636C43.6153 65.2277 36.7304 67.6098 27.7701 67.6098C18.8099 67.6098 11.925 65.2953 7.11548 60.6663C2.37183 56.0036 3.8147e-06 49.2967 3.8147e-06 40.5456V4.82927C3.8147e-06 2.16213 1.96995 0 4.4 0H13.2405C15.6705 0 17.6405 2.16214 17.6405 4.82927V39.1265C17.6405 43.7892 18.4805 47.2018 20.1605 49.3642C21.8735 51.5267 24.4759 52.6079 27.9678 52.6079C31.4596 52.6079 34.0127 51.5436 35.6268 49.4149C37.241 47.2863 38.0481 43.8399 38.0481 39.0758V4.82927Z" />
                <path d="M86.9 61.8682C86.9 64.5353 84.9301 66.6975 82.5 66.6975H73.6595C71.2295 66.6975 69.2595 64.5353 69.2595 61.8682V4.82927C69.2595 2.16214 71.2295 0 73.6595 0H82.5C84.9301 0 86.9 2.16214 86.9 4.82927V61.8682Z" />
                <path d="M2.86102e-06 83.2195C2.86102e-06 80.5524 1.96995 78.3902 4.4 78.3902H83.6C86.0301 78.3902 88 80.5524 88 83.2195V89.1707C88 91.8379 86.0301 94 83.6 94H4.4C1.96995 94 0 91.8379 0 89.1707L2.86102e-06 83.2195Z" />
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
    --size: 220px;
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
  .loader .box:nth-child(5) { inset: 0%;  z-index: 95; border-color: rgba(255,255,255,0.2); animation-delay: 0.8s; }

  .loader .logo {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
    padding: 28%;
  }

  .loader .logo svg {
    fill: var(--logo-color);
    width: 100%;
    animation: color-change var(--duration) infinite ease-in-out;
  }

  @keyframes ripple {
    0% { transform: scale(1); }
    50% { transform: scale(1.25); }
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