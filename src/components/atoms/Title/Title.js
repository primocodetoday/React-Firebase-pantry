﻿import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';

export const Title = styled.h1`
  padding: 0;
  margin: 0;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.big};
  font-weight: 700;

  ${({ card }) =>
    card &&
    css`
      color: ${({ theme }) => theme.secondary};
    `}
`;

Title.propTypes = {
  children: PropTypes.string.isRequired,
};
