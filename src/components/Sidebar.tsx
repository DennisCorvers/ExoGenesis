import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import ChevronDown from "../assets/icons/chevron-down.svg";
import ChevronRight from "../assets/icons/chevron-right.svg";

interface SidebarCategory {
    name: string;
    subItems: SidebarItem[];
}

interface SidebarItem {
    name: string;
    route: string;
}

function BuildSidebar(): SidebarCategory[] {
    const sidebar: SidebarCategory[] = [];
    const combatBar: SidebarCategory = {
        name: "Combat",
        subItems: []
    };
    const skillBar: SidebarCategory = {
        name: "Skills",
        subItems: [
            { name: "Mineral Harvesting", route: "/mineralharvesting" },
            { name: "Unnamed Skill", route: "/" }
        ]
    };

    sidebar.push(combatBar);
    sidebar.push(skillBar);
    return sidebar;
}
const Sidebar: React.FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (category: string) => {
        setExpanded((prev) => ({ ...prev, [category]: !prev[category] }));
    };

    const menuItems = BuildSidebar();
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            {/*Navigation section.*/}
            <ul className="sidebar-nav">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <div className="sidebar-nav-heading"
                            onClick={() => toggleExpand(item.name)}>
                            <div className="sidebar-nav-heading-content">
                                <span className="sidebar-nav-heading-text">{item.name}</span>
                                <span className="sidebar-nav-chevron">
                                    {expanded[item.name] ?
                                        <img src={ChevronDown} alt="Chevron Down" /> :
                                        <img src={ChevronRight} alt="Chevron Right" />}</span>
                            </div>
                        </div>{expanded[item.name] && (
                            <ul className="sidebar-nav">
                                {item.subItems.map((sub) => (
                                    <div className="sidebar-nav-item"
                                        onClick={() => navigate(sub.route)}>
                                        <div className="sidebar-nav-item-content">
                                            <span className="sidebar-nav-item-image"></span>
                                            <span className="sidebar-nav-item-text">{sub.name}</span>
                                            <span className="sidebar-nav-item-info"></span>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
