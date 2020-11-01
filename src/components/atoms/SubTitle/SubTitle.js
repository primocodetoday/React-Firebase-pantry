﻿import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

export const SubTitle = styled.p`
  padding: 0;
  margin: 0;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: 500;
`;

SubTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
