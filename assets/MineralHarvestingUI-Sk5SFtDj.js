import { r as reactExports, j as jsxRuntimeExports, E as EventBus } from "./index-BnOMN7Nq.js";
const ProgressBar = ({ elapsedTime, totalTime, enableProgressBars }) => {
  const innerBarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enableProgressBars || !innerBarRef.current) return;
    const delay = -elapsedTime;
    const duration = totalTime;
    innerBarRef.current.style.animation = "none";
    void innerBarRef.current.offsetHeight;
    innerBarRef.current.style.animation = `${duration}s linear ${delay}s 1 progressBar`;
  }, [elapsedTime, totalTime, enableProgressBars]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: innerBarRef,
      className: "inner-bar"
    }
  ) });
};
const ResourceNodeCard = ({ node, onClick }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-node-card", onClick: () => onClick(node), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: node.displayName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Experience Reward: ",
      node.experienceReward
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Level Requirement: ",
      node.levelRequirement
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Harvesting Time: ",
      node.actionTime,
      " seconds"
    ] })
  ] });
};
const useEventSubscription = (eventType, handler) => {
  reactExports.useEffect(() => {
    EventBus.instance.subscribe(eventType, handler);
    return () => {
      EventBus.instance.unsubscribe(eventType, handler);
    };
  }, [eventType, handler]);
};
const MineralHarvestingUI = ({ gameContext }) => {
  const [actionTime, setActionTime] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  const [currentNode, setCurrentNode] = reactExports.useState(null);
  const skill = gameContext.skills.mineralHarvesting;
  const player = gameContext.player;
  const skillState = player.skillManager.getSkillState(skill);
  const skillManager = player.skillManager;
  const onAction = reactExports.useCallback((event) => {
    updateHarvestProgress(event.action);
  }, []);
  const onStop = reactExports.useCallback((event) => {
    updateHarvestProgress(event.action);
  }, []);
  const handleNodeClick = reactExports.useCallback((node) => {
    if (skillState.isRunningAction(node)) {
      skillManager.stopPlayerAction(skill, node);
    } else {
      skillManager.startPlayerAction(skill, node);
    }
    updateHarvestProgress(node);
  }, []);
  const updateHarvestProgress = reactExports.useCallback((action) => {
    const nodeTime = skillState.isActive ? action.actionTime : 0;
    setCurrentNode(skillState.activeAction);
    setProgress(skillState.progress);
    setActionTime(nodeTime);
  }, []);
  useEventSubscription(`${skill.id}.actionComplete`, onAction);
  useEventSubscription(`${skill.id}.actionStopped`, onStop);
  reactExports.useEffect(() => {
    if (skillState.isActive)
      updateHarvestProgress(skillState.activeAction);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mining-ui", children: [
    currentNode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "node-details", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "Current Node: ",
        currentNode.displayName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Experience: ",
        currentNode.experienceReward
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Harvesting Time: ",
        currentNode.actionTime,
        " seconds"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Level Requirement: ",
        currentNode.levelRequirement
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-bar", style: { marginTop: "20px", maxWidth: "300px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Mining Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProgressBar,
        {
          elapsedTime: progress,
          totalTime: actionTime,
          enableProgressBars: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "node-container", children: skill.registeredNodes.map((node) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-6 col-md-4 col-lg-4 col-xl-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceNodeCard, { node, onClick: handleNodeClick }, node.uid) }, node.uid)) })
  ] });
};
export {
  MineralHarvestingUI as default
};
//# sourceMappingURL=MineralHarvestingUI-Sk5SFtDj.js.map
