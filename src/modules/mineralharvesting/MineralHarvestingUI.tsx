import React, { useState, useEffect, useCallback } from 'react';
import { GameContext } from '@game/core/GameContext';
import { BaseRecipe } from '@game/skills/requirements/BaseRecipe';
import { MineralHarvestingState } from '@game/state/MineralHarvestingState';
import { ActionEvent } from '@game/events/skill/ActionEvent';
import { ActionStoppedEvent } from '@game/events/skill/ActionStoppedEvent';
import { useEventSubscription } from '../../hooks/EventSubscription'
import { MineralNode } from '@game/skills/requirements/MineralNode';
import MineralNodeCard from './MineralNodeCard';
import ProgressBar from '../common/ProgressBar';
import './MineralHarvestingUI.css'

interface MineralHarvestingUIProps {
    gameContext: GameContext;
}

const MineralHarvestingUI: React.FC<MineralHarvestingUIProps> = ({ gameContext }) => {
    const [progressBar, setProgressBar] = useState({ current: 0, total: 0 });
    const [nodeHealth, setNodeHealthBar] = useState({ current: 0, total: 0 });
    const [currentNode, setCurrentNode] = useState<BaseRecipe | null>(null);

    const skill = gameContext.skills.mineralHarvesting;
    const player = gameContext.player;
    const skillState = player.skillManager.getSkillState(skill) as MineralHarvestingState;
    const skillManager = player.skillManager;

    const onAction = useCallback((event: ActionEvent) => {
        updateHarvestProgress(event.action as MineralNode);
    }, []);

    const onStop = useCallback((event: ActionStoppedEvent) => {
        updateHarvestProgress(event.action as MineralNode)
    }, []);

    const handleNodeClick = useCallback((node: MineralNode) => {
        // If the chosen action is running, stop the action, otherwise switch / start
        if (skillState.isRunningAction(node)) {
            skillManager.stopPlayerAction(skill, node);
        }
        else {
            skillManager.startPlayerAction(skill, node);
        }

        updateHarvestProgress(node);
    }, []);

    const updateHarvestProgress = useCallback((action: MineralNode) => {
        const nodeTime = skillState.isActive ? action.actionTime : 0;
        setCurrentNode(skillState.activeAction);
        setProgressBar({ current: skillState.progress, total: nodeTime });
        setNodeHealthBar({ current: skillState.nodeHealth, total: action.health });
    }, []);

    useEventSubscription(`${skill.id}.actionComplete`, onAction);
    useEventSubscription(`${skill.id}.actionStopped`, onStop);

    useEffect(() => {
        // Set the progress of the node, in case we are already harvesting
        if (skillState.isActive)
            updateHarvestProgress(skillState.activeAction!);
    }, []);

    return (
        <div className="mining-ui">
            {currentNode && (
                <div className="node-details">
                    <h2>Current Node: {currentNode.displayName}</h2>
                    <p>Experience: {currentNode.experienceReward}</p>
                    <p>Level Requirement: {currentNode.levelRequirement}</p>
                </div>
            )}

            <div style={{ marginTop: '20px', maxWidth: '300px' }}>
                <h3>Mining Progress</h3>
                <div className='nodehealth'>
                    <ProgressBar current={nodeHealth.current} total={nodeHealth.total} isAnimated={false} isReversed={true}/>
                </div>
                <div className='miningprogress'>
                    <ProgressBar current={progressBar.current} total={progressBar.total} isAnimated={true} />
                </div>
            </div>

            <div className="node-container">
                {skill.registeredNodes
                    .map((node) => (
                        <div key={node.uid} className='col-6 col-md-4 col-lg-4 col-xl-3'>
                            <MineralNodeCard key={node.uid} node={node} onClick={handleNodeClick} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MineralHarvestingUI;
