import React from "react";

interface CustomSectionProps {
  children: React.ReactNode[];
  toggleActive: boolean;
}

export const ConditionBlock = (props: CustomSectionProps) => {
  const { children, toggleActive } = props;

  // if (!children || children.length < 2) {
  //   console.error("CustomSection component requires exactly 2 children components.");
  //   return null;
  // }

  return <section>{toggleActive ? children[0] : children[1]}</section>;
};

ConditionBlock.schema = {
  title: "Custom Section",
  description: "A section that conditionally renders children based on a toggle",
  type: "object",
  properties: {
    toggleActive: {
      title: "Enable first child",
      description: "If enabled, the first child is displayed; otherwise, the second child is displayed",
      type: "boolean",
      default: false,
    },
  },
};
