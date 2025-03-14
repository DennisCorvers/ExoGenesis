import { useMemo, useState } from "react";
import { useActiveView } from "@modules/common/ActiveViewProvider";
import SidebarItem from './Sidebar/SidebarItem'
import ChevronDown from "@assets/icons/chevron-down.svg";
import ChevronRight from "@assets/icons/chevron-right.svg";
import { ISidebarCategory, ISidebarEntry } from "@game/ui/ISidebarEntry";
import { IGameContext } from "@game/core/IGameContext";
import "./Sidebar.css";
import SidebarSkill from "./Sidebar/SidebarSkill";

interface SidebarUIProps {
    gameContext: IGameContext;
}

const Sidebar: React.FC<SidebarUIProps> = ({ gameContext }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const { setActiveView } = useActiveView();

    const toggleExpand = (sectionName: string) => {
        setExpandedSections(prev => ({ ...prev, [sectionName]: !prev[sectionName], }));
    };

    const getSidebarComponent = useMemo(() => {
        return (item: ISidebarEntry) => {
            if (item.isSkill) {
                return <SidebarSkill key={item.id} item={item} player={gameContext.player} onClick={setActiveView} />;
            }

            return <SidebarItem key={item.id} item={item} player={gameContext.player} onClick={setActiveView} />;
        };
    }, [gameContext]);

    // TODO: Filter based on planet.
    const sidebarData: ISidebarCategory[] = useMemo(() => {
        return gameContext.layout.sidebarLayout.sidebarData;
    }, [gameContext]);

    const renderSection = (sectionName: string, items: ISidebarEntry[]) => {
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
                        {items.map(getSidebarComponent)}
                    </ul>
                )}
            </li>
        );
    }

    return (
        <div className="sidebar">
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            <ul className="sidebar-nav">
                {sidebarData
                    .filter((category) => category.entries.length > 0)
                    .map((category) => renderSection(category.name, category.entries))}
            </ul>
        </div>
    );
}


export default Sidebar;
