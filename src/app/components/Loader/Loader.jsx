"use client";

import React from "react";
import styled from "styled-components";

export default function Loader() {
  return (
    <Overlay>
      <StyledWrapper>
        <div className="loader">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" style={{ display: "block" }} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg">
              <path d="M4 12c0-2 4-4 8-4s8 2 8 4-4 4-8 4-8-2-8-4zm2 3c1.5 1 4 2 6 2s4.5-1 6-2v2c0 2-3 4-6 4s-6-2-6-4v-2zm11-6 4-2" />
              <path d="M7 4c0-1 1-2 2-2s2 1 2 2" />
              <path d="M11 4c0-1 1-2 2-2s2 1 2 2" />
              <path d="M15 4c0-1 1-2 2-2s2 1 2 2" />
            </svg>
          </div>
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
  gap: 16px;

  .loader {
    width: 120px;
    height: 120px;
    position: relative;
  }

  .loader::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.1);
    border-top: 3px solid #ff6b3d;
    animation: spin 1s linear infinite;
  }

  .logo {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo svg {
  width: 40px;
  height: 40px;
  stroke: #ff6b3d;
  stroke-width: 1.5;
  fill: none;
  display: block;
}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Brand = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;