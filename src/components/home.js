import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { mergeStyles, Nav, CommandBar, PrimaryButton } from '@fluentui/react';
import Profile from './profile';
import Settings from './settings';

// Styling for the background and layout
const homeStyle = mergeStyles({
  display: 'flex',
  backgroundColor: '#f7f7f7',
  minHeight: '100vh',
});

const navStyle = mergeStyles({
  width: '250px',
  backgroundColor: '#fff',
  borderRight: '1px solid #ddd',
  boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
});

const contentStyle = mergeStyles({
  flex: 1,
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  marginLeft: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
});

// Home Component
const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('home'); // Manage active tab state

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <h2>Welcome, {user?.email}!</h2>;
    }
  };

  const commandBarItems = [
    {
      key: 'logout',
      text: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <div className={homeStyle}>
      <div className={navStyle}>
        <Nav
          selectedKey={activeTab}
          onLinkClick={(e, item) => setActiveTab(item.key)}
          groups={[
            {
              links: [
                { name: 'Home', key: 'home', iconProps: { iconName: 'Home' } },
                { name: 'Profile', key: 'profile', iconProps: { iconName: 'Contact' } },
                { name: 'Settings', key: 'settings', iconProps: { iconName: 'Settings' } },
              ],
            },
          ]}
        />
      </div>
      <div className={contentStyle}>
        <CommandBar items={commandBarItems} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
