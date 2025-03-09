import React from 'react';
import { MineralNode } from '@game/skills/requirements/MineralNode';
import '../common/ResourceNodeCard.css';

interface MineralNodeCardProps {
  node: MineralNode;
  onClick: (node: MineralNode) => void;
}

const MineralNodeCard: React.FC<MineralNodeCardProps> = ({ node, onClick }) => {
  return (
    <div className="resource-node-card" onClick={() => onClick(node)}>
      <h3>{node.displayName}</h3>
      <p>Experience Reward: {node.experienceReward}</p>
      <p>Level Requirement: {node.levelRequirement}</p>
      <p>Harvesting Time: {node.actionTime} seconds</p>
      <p>Hardness: {node.hardness}</p>
      <p>Hitpoints: {node.health}</p>
    </div>
  );
};

export default MineralNodeCard;
