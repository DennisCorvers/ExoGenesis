import React from 'react';
import { SimpleHarvestRecipe } from '@game/skills/requirements/SimpleHarvestRecipe';
import './ResourceNodeCard.css';

interface ResourceNodeCardProps {
  node: SimpleHarvestRecipe;
  onClick: (node: SimpleHarvestRecipe) => void;
}

const ResourceNodeCard: React.FC<ResourceNodeCardProps> = ({ node, onClick }) => {
  return (
    <div className="resource-node-card" onClick={() => onClick(node)}>
      <h3>{node.name}</h3>
      <p>Experience Reward: {node.experienceReward}</p>
      <p>Level Requirement: {node.levelRequirement}</p>
      <p>Harvesting Time: {node.actionTime} seconds</p>
    </div>
  );
};

export default ResourceNodeCard;
