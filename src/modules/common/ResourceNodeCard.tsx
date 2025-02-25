import React from 'react';
import { SingleResourceRecipe } from '../../game/skills/requirements/SingleResourceRecipe';
import './ResourceNodeCard.css';


interface ResourceNodeCardProps {
  node: SingleResourceRecipe;
  onClick: (node: SingleResourceRecipe) => void;
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
