import React, { useState, useEffect, useCallback } from 'react';
import { GameContext } from '../../game/core/GameContext';
import { EventBus } from '../../game/events/EventBus';
import ProgressBar from '../common/ProgressBar';
import ResourceNodeCard from '../common/ResourceNodeCard';
import { BaseRecipe } from '../../game/skills/requirements/BaseRecipe';
import { SingleResourceRecipe } from '../../game/skills/requirements/SingleResourceRecipe';
import { MineralHarvestingState } from '../../game/state/MineralHarvestingState';
import { ActionEvent } from '../../game/events/skill/ActionEvent';
import { ActionStoppedEvent } from '../../game/events/skill/ActionStoppedEvent';
import { useEventSubscription } from '../../hooks/EventSubscription'

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

    const onAction = useCallback((event: ActionEvent) => {
        updateHarvestProgress(event.action as SingleResourceRecipe);
    }, []);

    const onStop = useCallback((event: ActionStoppedEvent) => {
        updateHarvestProgress(event.action as SingleResourceRecipe)
    }, []);

    const handleNodeClick = useCallback((node: SingleResourceRecipe) => {
        // If the chosen action is running, stop the action, otherwise switch / start
        if (skillState.isRunningAction(node)) {
            skillManager.stopPlayerAction(skill, node);
        }
        else {
            skillManager.startPlayerAction(skill, node);
        }

        updateHarvestProgress(node);
    }, []);

    const updateHarvestProgress = useCallback((action: SingleResourceRecipe) => {
        const nodeTime = skillState.isActive ? action.actionTime : 0;
        setCurrentNode(skillState.activeAction);
        setProgress(skillState.progress)
        setActionTime(nodeTime);
    }, []);

    useEventSubscription("mineralharvesting.action", onAction);
    useEventSubscription("mineralharvesting.stop", onStop);

    useEffect(() => {
        // Set the progress of the node, in case we are already harvesting
        if (skillState.isActive)
            updateHarvestProgress(skillState.activeAction!);
    }, []);

    return (
        <div className="mining-ui">
            <div className="node-cards">
                {skill.registeredNodes
                    .map((node) => (
                        <ResourceNodeCard key={node.uid} node={node} onClick={handleNodeClick} />
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
