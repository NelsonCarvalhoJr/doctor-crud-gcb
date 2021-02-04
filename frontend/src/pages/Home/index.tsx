import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <>
    <h1>Home</h1>
    <Link to="create">Create</Link>
    <Link to="update/1">Update 1</Link>
  </>
);

export default Home;
