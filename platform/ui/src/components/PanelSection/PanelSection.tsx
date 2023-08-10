import React, { useState } from 'react';
import { Icon } from '@ohif/ui';
import PropTypes from 'prop-types';

const PanelSection = ({ title, children, actionIcons = [] }) => {
  const [isChildrenVisible, setChildrenVisible] = useState(true);

  const handleHeaderClick = () => {
    setChildrenVisible(!isChildrenVisible);
  };

  return (
    <>
      <div
        className="flex justify-between h-7 bg-primary-dark px-2.5 items-center cursor-pointer select-none"
        onClick={handleHeaderClick}
      >
        <div className="text-aqua-pale">{title}</div>
        <div className="flex">
          {actionIcons.map((icon, index) => (
            <Icon
              key={index}
              name={icon.name}
              onClick={e => {
                e.stopPropagation();
                icon.onClick();
              }}
            />
          ))}
          <Icon
            name={isChildrenVisible ? 'chevron-down-new' : 'chevron-left-new'}
          />
        </div>
      </div>
      {isChildrenVisible && children}
    </>
  );
};

PanelSection.defaultProps = {};

PanelSection.propTypes = {
  title: PropTypes.string,
};

export default PanelSection;