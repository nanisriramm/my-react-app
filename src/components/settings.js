import React from 'react';
import { TextField, PrimaryButton } from '@fluentui/react';

const Settings = () => (
  <div>
    <h2>Settings Page</h2>
    <TextField label="Email Notifications" defaultValue="Enabled" />
    <TextField label="Theme" defaultValue="Light" />
    <PrimaryButton text="Save Changes" style={{ marginTop: '20px' }} />
  </div>
);

export default Settings;
