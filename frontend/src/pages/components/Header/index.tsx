import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderContainer, HeaderText, HeaderLinkContainer } from './styles';

import Button from '../Button';

interface IHeaderProps {
  title: string;
}

const CreateDoctor: React.FC<IHeaderProps> = ({ title }) => (
  <HeaderContainer>
    <HeaderText>{title}</HeaderText>

    <HeaderLinkContainer>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="create">
        <Button>Cadastrar Médico</Button>
      </Link>
    </HeaderLinkContainer>
  </HeaderContainer>
);

export default CreateDoctor;
