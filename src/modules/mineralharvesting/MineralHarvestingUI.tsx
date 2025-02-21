import React, { useState, useEffect } from 'react';
import { GameContext } from '../../game/core/GameContext';
import { ResourceNode } from '../../game/core/ResourceNode';
import { MineralHarvesting } from '../../game/skills/MineralHarvesting';
import { MineralHarvestingActionEvent } from '../../game/events/MineralHarvestingEvent';
import { EventBus } from '../../game/events/EventBus';
import ProgressBar from '../common/ProgressBar';
import ResourceNodeCard from '../common/ResourceNodeCard';

interface MineralHarvestingUIProps {
    gameContext: GameContext;
}

const MineralHarvestingUI: React.FC<MineralHarvestingUIProps> = ({ gameContext }) => {
    const [actionTime, setActionTime] = useState(0)
    const [progress, setProgress] = useState(0);
    const [currentNode, setCurrentNode] = useState<ResourceNode | null>(null);

    const skill = gameContext.getSkillByType(MineralHarvesting);

    useEffect(() => {
        const handleMiningProgress = (event: MineralHarvestingActionEvent) => {

            // Harvesting action finished, check if the next action is in progress
            if (!skill) {
                return;
            }

            setProgress(skill.progress);

            if (skill.isActive()) {
                setActionTime(event.mineralNode.harvestingTime);
            }
        };

        EventBus.instance.subscribe(MineralHarvestingActionEvent, handleMiningProgress);

        return () => {
            EventBus.instance.unsubscribe(MineralHarvestingActionEvent, handleMiningProgress);
        };
    }, [gameContext]);

    const handleNodeClick = (node: ResourceNode) => {
        if (skill.isActive()) {
            if (skill.activeNode === node) {
                skill.stopHarvesting(node);
                setCurrentNode(null);
                setProgress(0);
                setActionTime(0);
            }
            else {
                skill.stopHarvesting(skill.activeNode!);
                skill.startHarvesting(node);
                setCurrentNode(node);
                setProgress(0);
                setActionTime(node.harvestingTime);
            }
        }
        else {
            skill.startHarvesting(node);
            setCurrentNode(node);
            setProgress(0);
            setActionTime(node.harvestingTime);
        }
    };

    return (
        <div className="mining-ui">
            <div className="node-cards">
                {gameContext.skills
                    .filter(skill => skill instanceof MineralHarvesting)
                    .flatMap(skill => skill.registeredNodes)
                    .map((node) => (
                        <ResourceNodeCard key={node.name} node={node} onClick={handleNodeClick} />
                    ))}
            </div>

            {currentNode && (
                <div className="node-details">
                    <h2>Current Node: {currentNode.name}</h2>
                    <p>Experience: {currentNode.experienceReward}</p>
                    <p>Harvesting Time: {currentNode.harvestingTime} seconds</p>
                    <p>Level Requirement: {currentNode.levelRequirement}</p>
                </div>
            )}

            <div className="progress-bar" style={{ marginTop: '20px', maxWidth: '300px' }}>
                <h3>Mining Progress</h3>
                <ProgressBar
                    elapsedTime={progress}
                    totalTime={actionTime}
                    enableProgressBars={true}
                />
            </div>
        </div>
    );
};

export default MineralHarvestingUI;
