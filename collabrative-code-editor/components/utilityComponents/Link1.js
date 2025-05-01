import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Link1 = ({text,link}) => {
  return (
    <StyledWrapper>
      <Link className="menu__link" href={`/${link}`}>{text}</Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* <reset-style> ============================ */
  a {
    text-decoration: none;
  }
  /* <main-style> ============================ */
  .menu__link {
    color: #000;
    line-height: 2;
    position: relative;
  }

  .menu__link::before {
    content: '';
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: #000;
    position: absolute;
    bottom: -.25rem;
    left: 0;
    transition: width .4s;
  }

  .menu__link:hover::before {
    width: 100%;
  }`;

export default Link1;
