import { useMemo, useState } from "react";
import { useActiveView } from "@modules/common/ActiveViewProvider";
import SidebarItem from './Sidebar/SidebarItem'
import ChevronDown from "@assets/icons/chevron-down.svg";
import ChevronRight from "@assets/icons/chevron-right.svg";
import "./Sidebar.css";
import { IGameContext } from "@game/core/IGameContext";
import { ISidebarItem } from "./Sidebar/ISidebarItem";

interface SidebarUIProps {
    gameContext: IGameContext;
}

const Sidebar: React.FC<SidebarUIProps> = ({ gameContext }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const { setActiveView } = useActiveView();

    const toggleExpand = (sectionName: string) => {
        setExpandedSections(prev => ({ ...prev, [sectionName]: !prev[sectionName], }));
    };

    const availableSkills: ISidebarItem[] = useMemo(() => {
        const items = [];
        const skl = gameContext.skills.getObject('exo.mineralharvesting');
        const state = gameContext.player.skillManager.getSkillState(skl);
        items.push({
            id: skl.id,
            icon: skl.Media,
            name: skl.displayName,
            route: 'mineralharvestingskill',
            info: `Lv ${state.level}/${skl.LevelCap}`
        });
        return items;
    }, []);

    const renderSection = (sectionName: string, items: ISidebarItem[]) => {
        if (items.length === 0)
            return null;

        const isExpanded = expandedSections[sectionName];

        return (
            <li key={sectionName}>
                <div className="sidebar-nav-heading" onClick={() => toggleExpand(sectionName)}>
                    <div className="sidebar-nav-heading-content">
                        <span className="sidebar-nav-heading-text">{sectionName}</span>
                        <span className="sidebar-nav-chevron">
                            {isExpanded ? (
                                <img src={ChevronDown} alt="Chevron Down" />
                            ) : (
                                <img src={ChevronRight} alt="Chevron Right" />
                            )}
                        </span>
                    </div>
                </div>
                {isExpanded && (
                    <ul className="sidebar-nav">
                        {items.map(item => (
                            <SidebarItem
                                key={item.id}
                                item={item}
                                onClick={setActiveView} />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <div className="sidebar">
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            <ul className="sidebar-nav">
                {renderSection('Player', [])};
                {renderSection('Navigation', [])};
                {renderSection('Combat', [])};
                {renderSection('Gathering', availableSkills)};
                {renderSection('Synthesis', [])};
                {renderSection('Settings', [])};
            </ul>
        </div>
    );
}


export default Sidebar;
