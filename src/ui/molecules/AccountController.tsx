import React from 'react';
import { ActionButton } from '../atoms/ActionButton';

export const AccountController = () => {
  return (
    <div className="flex gap-4 p-4 border border-gray-700 rounded-xl bg-gray-900">
      <ActionButton label="إيداع" onClick={() => {}} color="green" />
      <ActionButton label="سحب" onClick={() => {}} color="red" />
    </div>
  );
};
