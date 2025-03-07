import { ElementType, useState } from "react";
import { House, Info, Headset, Menu, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { text: "Home", link: "/", icon: House },
  { text: "Chat", link: "/chat", icon: MessageCircle },
  { text: "About", link: "/about", icon: Info },
  { text: "Contact", link: "/contact", icon: Headset },
];

export interface NavButtonProps {
  text: string;
  link: string;
  icon: ElementType;
  isOpen: boolean;
}

export function SidebarNavButton({
  text,
  link,
  icon: Icon,
  isOpen,
}: NavButtonProps) {
  return (
    <li>
      <Link to={link} className="sidebarButton">
        <div className={`flex items-center ${isOpen ? "ml-2" : "ml-1"}`}>
          <Icon />
          {isOpen && <span className="font-semibold ml-2">{text}</span>}
        </div>
      </Link>
    </li>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "w-64" : "w-16"}`}>
      {/* Title line */}
      <div className="flex justify-between items-center p-4">
        <span
          className={`${isOpen ? "block" : "hidden"} text-xl font-semibold`}
        >
          Slate
        </span>
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      {/* Sidebar content */}
      <ul className="mt-4 space-y-4 px-4">
        {NAV_ITEMS.map((button) => (
          <SidebarNavButton
            key={button.text}
            isOpen={isOpen}
            link={button.link}
            icon={button.icon}
            text={button.text}
          />
        ))}
      </ul>
    </div>
  );
}
