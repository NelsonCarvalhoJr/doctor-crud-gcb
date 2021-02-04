import React from 'react';
import { Link } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderText,
  HeaderLinkContainer,
  HeaderLinkContent,
} from './styles';

import Button from '../Button';

interface IHeaderProps {
  title: string;
}

const CreateDoctor: React.FC<IHeaderProps> = ({ title }) => (
  <HeaderContainer>
    <HeaderText>{title}</HeaderText>

    <HeaderLinkContainer>
      <HeaderLinkContent>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </HeaderLinkContent>
      <HeaderLinkContent>
        <Link to="/create">
          <Button>Cadastrar Médico</Button>
        </Link>
      </HeaderLinkContent>
    </HeaderLinkContainer>
  </HeaderContainer>
);

export default CreateDoctor;
