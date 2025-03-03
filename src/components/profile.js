import React from 'react';
import { TextField } from '@fluentui/react';

const Profile = () => (
  <div>
    <h2>Profile Page</h2>
    <TextField label="Email" value="user@example.com" readOnly />
    <TextField label="Name" value="John Doe" readOnly />
  </div>
);

export default Profile;
