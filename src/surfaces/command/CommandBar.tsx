import React, { useState } from 'react';

interface CommandBarProps {
  isOpen?: boolean;
  onClose?: () => void;
  placeholder?: string;
  commands?: Command[];
  onCommandSelect?: (command: Command) => void;
}

export interface Command {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  action?: () => void;
}

/**
 * Command bar component for keyboard-driven command execution
 */
export const CommandBar: React.FC<CommandBarProps> = ({
  isOpen = false,
  onClose,
  placeholder = 'Type a command...',
  commands = [],
  onCommandSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;
  
  const filteredCommands = commands.filter(command => 
    command.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCommandSelect = (command: Command) => {
    if (onCommandSelect) {
      onCommandSelect(command);
    }
    if (command.action) {
      command.action();
    }
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.map((command) => (
            <div
              key={command.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => handleCommandSelect(command)}
            >
              <div className="flex items-center">
                {command.icon && <span className="mr-2">{command.icon}</span>}
                <span>{command.label}</span>
              </div>
              {command.shortcut && (
                <span className="text-xs text-gray-500">{command.shortcut}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 