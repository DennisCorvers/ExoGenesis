import React, { useState, useEffect } from 'react';
import { GameContext } from '../../game/core/GameContext';
import { MineralHarvesting } from '../../game/skills/MineralHarvesting';
import { MineralHarvestingActionEvent } from '../../game/events/MineralHarvestingEvent';
import { EventBus } from '../../game/events/EventBus';
import ProgressBar from '../common/ProgressBar';
import ResourceNodeCard from '../common/ResourceNodeCard';
import { BaseRecipe } from '../../game/skills/requirements/BaseRecipe';
import { SingleResourceRecipe } from '../../game/skills/requirements/SingleResourceRecipe';
import { MineralHarvestingState } from '../../game/state/MineralHarvestingState';

interface MineralHarvestingUIProps {
    gameContext: GameContext;
}

const MineralHarvestingUI: React.FC<MineralHarvestingUIProps> = ({ gameContext }) => {
    const [actionTime, setActionTime] = useState(0)
    const [progress, setProgress] = useState(0);
    const [currentNode, setCurrentNode] = useState<BaseRecipe | null>(null);

    const skill = gameContext.skills.mineralHarvesting;
    const player = gameContext.player;
    const skillState = player.skillManager.getSkill(skill) as MineralHarvestingState;
    const skillManager = player.skillManager;
    
    useEffect(() => {
        const handleMiningProgress = (event: MineralHarvestingActionEvent) => {
            setProgress(skillState.progress);

            if (skillState.isActive) {
                setActionTime(event.mineralNode.actionTime);
            }
        };

        EventBus.instance.subscribe(MineralHarvestingActionEvent, handleMiningProgress);

        // Set the progress of the node, in case we are already harvesting
        if (skillState.isActive)
            updateHarvestProgress(skillState.activeAction!);

        return () => {
            EventBus.instance.unsubscribe(MineralHarvestingActionEvent, handleMiningProgress);
        };
    });

    const handleNodeClick = (node: SingleResourceRecipe) => {
        if (skillState.isActive) {
            if (skillState.activeAction === node) {
                skillManager.stopPlayerAction(skill, node);
            }
            else {
                skillManager.stopPlayerAction(skill, node);
                skillManager.startPlayerAction(skill, node);
            }
        }
        else {
            skillManager.startPlayerAction(skill, node);
        }

        updateHarvestProgress(node);
    };

    const updateHarvestProgress = (action: SingleResourceRecipe) => {
        const nodeTime = skillState.isActive ? action.actionTime : 0;
        setCurrentNode(skillState.activeAction);
        setProgress(skillState.progress)
        setActionTime(nodeTime);
    }

    return (
        <div className="mining-ui">
            <div className="node-cards">
                {skill.registeredNodes
                    .map((node) => (
                        <ResourceNodeCard key={node.name} node={node} onClick={handleNodeClick} />
                    ))}
            </div>

            {currentNode && (
                <div className="node-details">
                    <h2>Current Node: {currentNode.name}</h2>
                    <p>Experience: {currentNode.experienceReward}</p>
                    <p>Harvesting Time: {currentNode.actionTime} seconds</p>
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
