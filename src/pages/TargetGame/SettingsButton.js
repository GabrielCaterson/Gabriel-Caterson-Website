import React from 'react';

const SettingsButton = ({ toggleSettings }) => {
  return (
    <button 
      className="settings-button absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded"
      onClick={(e) => { e.stopPropagation(); toggleSettings(); }}
    >
      Settings
    </button>
  );
};

export default SettingsButton;

