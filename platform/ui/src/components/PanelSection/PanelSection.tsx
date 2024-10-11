import React, { useState } from 'react';
import { Icon } from '@ohif/ui';
import PropTypes from 'prop-types';

const PanelSection = ({ title, children, actionIcons = [], childrenClassName }) => {
  const [areChildrenVisible, setChildrenVisible] = useState(true);

  const handleHeaderClick = () => {
    setChildrenVisible(!areChildrenVisible);
  };

  return (
    <>
      <div
        className="flex cursor-pointer select-none items-center justify-between"
        onClick={handleHeaderClick}
      >
        <div className="text-aqua-pale p-4 !text-base font-bold uppercase">{title}</div>
        <div className="flex items-center space-x-1">
          {actionIcons.map((icon, index) => (
            <Icon
              key={index}
              name={icon.name}
              onClick={e => {
                e.stopPropagation();
                if (!areChildrenVisible) {
                  setChildrenVisible(true);
                }
                icon.onClick();
              }}
            />
          ))}
          <div className="grid h-[28px] w-[28px] place-items-center">
            <Icon name={areChildrenVisible ? 'chevron-down-new' : 'chevron-left-new'} />
          </div>
        </div>
      </div>
      {areChildrenVisible && (
        <>
          <div
            className={`flex flex-col overflow-hidden border-t border-[#323132] ${childrenClassName}`}
          >
            {children}
          </div>
        </>
      )}
    </>
  );
};

PanelSection.defaultProps = {};

PanelSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  childrenClassName: PropTypes.string,
  actionIcons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default PanelSection;
