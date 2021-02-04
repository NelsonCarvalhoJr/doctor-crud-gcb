import React from 'react';
import { Link } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderText,
  HeaderLinkContainer,
  HeaderLinkButton,
} from './styles';

interface IHeaderProps {
  title: string;
}

const CreateDoctor: React.FC<IHeaderProps> = ({ title }) => (
  <HeaderContainer>
    <HeaderText>{title}</HeaderText>

    <HeaderLinkContainer>
      <Link to="/">
        <HeaderLinkButton>Home</HeaderLinkButton>
      </Link>
      <Link to="create">
        <HeaderLinkButton>Cadastrar Médico</HeaderLinkButton>
      </Link>
    </HeaderLinkContainer>
  </HeaderContainer>
);

export default CreateDoctor;
