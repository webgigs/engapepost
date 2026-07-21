import React from "react";
import { FiBookOpen, FiShield, FiUsers, FiHeart, FiAward } from "react-icons/fi";
import { FaLeaf, FaSeedling, FaHandshake, FaBullhorn } from "react-icons/fa";

/**
 * Maps the icon keys used in Data.js to components, so the content file stays
 * free of imports from the icon library.
 */
const ICONS = {
  book: FiBookOpen,
  shield: FiShield,
  users: FiUsers,
  heart: FiHeart,
  award: FiAward,
  leaf: FaLeaf,
  sprout: FaSeedling,
  handshake: FaHandshake,
  megaphone: FaBullhorn,
};

const Icon = ({ name, ...rest }) => {
  const Component = ICONS[name] || FiBookOpen;
  return <Component aria-hidden="true" focusable="false" {...rest} />;
};

export default Icon;
