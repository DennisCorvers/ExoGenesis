import React from 'react';
import { ResourceNode } from '../../game/core/ResourceNode';
import './ResourceNodeCard.css';

interface ResourceNodeCardProps {
  node: ResourceNode;
  onClick: (node: ResourceNode) => void;
}

const ResourceNodeCard: React.FC<ResourceNodeCardProps> = ({ node, onClick }) => {
  return (
    <div className="resource-node-card" onClick={() => onClick(node)}>
      <h3>{node.name}</h3>
      <p>Experience Reward: {node.experienceReward}</p>
      <p>Level Requirement: {node.levelRequirement}</p>
      <p>Harvesting Time: {node.harvestingTime} seconds</p>
    </div>
  );
};

export default ResourceNodeCard;
