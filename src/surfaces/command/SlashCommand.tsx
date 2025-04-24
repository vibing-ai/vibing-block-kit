import React, { useState, useRef, useEffect } from 'react';
import { Command } from './CommandBar';

interface SlashCommandProps {
  commands: Command[];
  onCommandSelect: (command: Command) => void;
  triggerKey?: string;
}

/**
 * Slash command component for inline command execution
 */
export const SlashCommand: React.FC<SlashCommandProps> = ({
  commands,
  onCommandSelect,
  triggerKey = '/',
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const filteredCommands = commands.filter(command => 
    command.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive) {
      if (e.key === triggerKey) {
        setIsActive(true);
        e.preventDefault();
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          onCommandSelect(filteredCommands[selectedIndex]);
          setIsActive(false);
          setSearchTerm('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsActive(false);
        setSearchTerm('');
        break;
    }
  };
  
  return (
    <>
      <div className="w-full relative">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded"
          placeholder="Type / to start a command"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            if (isActive) {
              setSearchTerm(e.target.value.startsWith(triggerKey) 
                ? e.target.value.slice(1) 
                : e.target.value);
            }
          }}
        />
        
        {isActive && filteredCommands.length > 0 && (
          <div 
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-10 max-h-60 overflow-y-auto"
          >
            {filteredCommands.map((command, index) => (
              <div
                key={command.id}
                className={`px-3 py-2 cursor-pointer flex items-center ${
                  index === selectedIndex ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  onCommandSelect(command);
                  setIsActive(false);
                  setSearchTerm('');
                }}
              >
                {command.icon && <span className="mr-2">{command.icon}</span>}
                <span>{command.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}; 