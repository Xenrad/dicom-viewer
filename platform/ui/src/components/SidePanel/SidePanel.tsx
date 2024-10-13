import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import Tooltip from '../Tooltip';

type StyleMap = {
  open: {
    left: { marginLeft: string };
    right: { marginRight: string };
  };
  closed: {
    left: { marginLeft: string };
    right: { marginRight: string };
  };
};
const borderSize = 4;
const collapsedWidth = 25;
const closeIconWidth = 30;
const gridHorizontalPadding = 10;
const tabSpacerWidth = 2;

const baseClasses =
  'transition-all duration-300 ease-in-out justify-start box-content flex flex-col pb-2';

const classesMap = {
  open: {
    left: `px-2`,
    right: `px-2`,
  },
  closed: {
    left: `pl-6 items-end`,
    right: `pr-6 items-start`,
  },
};

const openStateIconClass = {
  left: 'rotate-0',
  right: 'rotate-180',
};

const getTabWidth = (numTabs: number) => {
  if (numTabs < 3) {
    return 68;
  } else {
    return 40;
  }
};

const getGridWidth = (numTabs: number, gridAvailableWidth: number) => {
  const spacersWidth = (numTabs - 1) * tabSpacerWidth;
  const tabsWidth = getTabWidth(numTabs) * numTabs;

  if (gridAvailableWidth > tabsWidth + spacersWidth) {
    return tabsWidth + spacersWidth;
  }

  return gridAvailableWidth;
};

const getNumGridColumns = (numTabs: number, gridWidth: number) => {
  if (numTabs === 1) {
    return 1;
  }

  // Start by calculating the number of tabs assuming each tab was accompanied by a spacer.
  const tabWidth = getTabWidth(numTabs);
  const numTabsWithOneSpacerEach = Math.floor(gridWidth / (tabWidth + tabSpacerWidth));

  // But there is always one less spacer than tabs, so now check if an extra tab with one less spacer fits.
  if (
    (numTabsWithOneSpacerEach + 1) * tabWidth + numTabsWithOneSpacerEach * tabSpacerWidth <=
    gridWidth
  ) {
    return numTabsWithOneSpacerEach + 1;
  }

  return numTabsWithOneSpacerEach;
};

const getGridStyle = (
  side: string,
  numTabs: number = 0,
  gridWidth: number,
  expandedWidth: number
): CSSProperties => {
  const relativePosition = Math.max(0, Math.floor(expandedWidth - gridWidth) / 2 - closeIconWidth);
  return {
    position: 'relative',
    ...(side === 'left' ? { right: `${relativePosition}px` } : { left: `${relativePosition}px` }),
    width: `${gridWidth}px`,
  };
};

const getTabClassNames = (
  numColumns: number,
  numTabs: number,
  tabIndex: number,
  isActiveTab: boolean,
  isTabDisabled: boolean
) =>
  classnames('h-[28px] mb-[2px] cursor-pointer text-white rounded-md', {
    'hover:border hover:border-primary-light/70': !isActiveTab && !isTabDisabled,
  });

const getTabStyle = (numTabs: number) => {
  return {
    width: `${getTabWidth(numTabs)}px`,
  };
};

const getTabIconClassNames = (numTabs: number, isActiveTab: boolean) => {
  return classnames('h-full w-full flex items-center justify-center', {
    'bg-primary-light text-black': isActiveTab,
    rounded: isActiveTab,
  });
};
const createStyleMap = (
  expandedWidth: number,
  borderSize: number,
  collapsedWidth: number
): StyleMap => {
  const collapsedHideWidth = expandedWidth - collapsedWidth - borderSize;

  return {
    open: {
      left: { marginLeft: '0px' },
      right: { marginRight: '0px' },
    },
    closed: {
      left: { marginLeft: `-${collapsedHideWidth}px` },
      right: { marginRight: `-${collapsedHideWidth}px` },
    },
  };
};

const getToolTipContent = (label: string, disabled: boolean) => {
  return (
    <>
      <div>{label}</div>
      {disabled && <div className="text-white">{'Not available based on current context'}</div>}
    </>
  );
};

const createBaseStyle = (expandedWidth: number) => {
  return {
    maxWidth: `${expandedWidth}px`,
    width: `${expandedWidth}px`,
    // To align the top of the side panel with the top of the viewport grid, use position relative and offset the
    // top by the same top offset as the viewport grid. Also adjust the height so that there is no overflow.
    position: 'relative',
    top: '0.2%',
    height: '97.2%',
  };
};
const SidePanel = ({
  side,
  className,
  activeTabIndex: activeTabIndexProp,
  tabs,
  onOpen,
  expandedWidth = 248,
  onActiveTabIndexChange,
}) => {
  const { t } = useTranslation('SidePanel');

  const [panelOpen, setPanelOpen] = useState(activeTabIndexProp !== null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const styleMap = createStyleMap(expandedWidth, borderSize, collapsedWidth);
  const baseStyle = createBaseStyle(expandedWidth);
  const gridAvailableWidth = expandedWidth - closeIconWidth - gridHorizontalPadding;
  const gridWidth = getGridWidth(tabs.length, gridAvailableWidth);
  const openStatus = panelOpen ? 'open' : 'closed';
  const style = Object.assign({}, styleMap[openStatus][side], baseStyle);

  const updatePanelOpen = useCallback(
    (panelOpen: boolean) => {
      setPanelOpen(panelOpen);
      if (panelOpen && onOpen) {
        onOpen();
      }
    },
    [onOpen]
  );

  const updateActiveTabIndex = useCallback(
    (activeTabIndex: number) => {
      if (activeTabIndex === null) {
        updatePanelOpen(false);
        return;
      }

      setActiveTabIndex(activeTabIndex);
      updatePanelOpen(true);

      if (onActiveTabIndexChange) {
        onActiveTabIndexChange({ activeTabIndex });
      }
    },
    [onActiveTabIndexChange, updatePanelOpen]
  );

  useEffect(() => {
    updateActiveTabIndex(activeTabIndexProp);
  }, [activeTabIndexProp, updateActiveTabIndex]);

  const getCloseStateComponent = () => {
    const _childComponents = Array.isArray(tabs) ? tabs : [tabs];
    return (
      <>
        <div className="px-1">
          <div
            className={classnames(
              'flex cursor-pointer items-center rounded-md bg-[#1C1C1E] p-2.5',
              side === 'left' ? 'justify-start' : 'justify-end'
            )}
            onClick={() => {
              updatePanelOpen(!panelOpen);
            }}
            data-cy={`side-panel-header-${side}`}
          >
            <Icon
              name={'navigation-panel-right-reveal-white'}
              className={classnames('text-white', side === 'left' && 'rotate-180 transform')}
              style={{
                width: '22px',
                height: '22px',
              }}
            />
          </div>
        </div>
        <div className={classnames('mt-3 flex flex-col gap-3 px-1')}>
          {_childComponents.map((childComponent, index) => (
            <Tooltip
              position={side === 'left' ? 'right' : 'left'}
              key={index}
              content={getToolTipContent(childComponent.label, childComponent.disabled)}
              className={classnames(
                'flex items-center rounded-md bg-[#1C1C1E] p-2.5',
                side === 'left' ? 'justify-end ' : 'justify-start '
              )}
            >
              <div
                id={`${childComponent.name}-btn`}
                data-cy={`${childComponent.name}-btn`}
                className="text-white hover:cursor-pointer"
                onClick={() => {
                  return childComponent.disabled ? null : updateActiveTabIndex(index);
                }}
              >
                <Icon
                  name={childComponent.iconName}
                  className={classnames({
                    'text-white': true,
                    'ohif-disabled': childComponent.disabled,
                  })}
                  style={{
                    width: '22px',
                    height: '22px',
                  }}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </>
    );
  };

  const getCloseIcon = () => {
    return (
      <div
        className={classnames(
          'flex h-[28px] cursor-pointer items-center justify-center',
          side === 'left' ? 'order-last' : 'order-first'
        )}
        style={{ width: `${closeIconWidth}px` }}
        onClick={() => {
          updatePanelOpen(!panelOpen);
        }}
        data-cy={`side-panel-header-${side}`}
      >
        <Icon
          name={'navigation-panel-right-reveal-white'}
          className={'text-white ' + openStateIconClass[side]}
        />
      </div>
    );
  };

  const getTabGridComponent = () => {
    const numCols = getNumGridColumns(tabs.length, gridWidth);

    return (
      <div className={classnames('flex grow ', side === 'right' ? 'justify-start' : 'justify-end')}>
        <div
          className={classnames('flex flex-wrap text-white')}
          style={getGridStyle(side, tabs.length, gridWidth, expandedWidth)}
        >
          {tabs.map((tab, tabIndex) => {
            const { disabled } = tab;
            return (
              <React.Fragment key={tabIndex}>
                {tabIndex % numCols !== 0 && (
                  <div className={classnames('flex h-[28px] w-[2px] items-center', tabSpacerWidth)}>
                    <div className="bg-primary-dark h-[20px] w-full"></div>
                  </div>
                )}
                <Tooltip
                  position={'bottom'}
                  key={tabIndex}
                  content={getToolTipContent(tab.label, disabled)}
                >
                  <div
                    className={getTabClassNames(
                      numCols,
                      tabs.length,
                      tabIndex,
                      tabIndex === activeTabIndex,
                      disabled
                    )}
                    style={getTabStyle(tabs.length)}
                    onClick={() => {
                      return disabled ? null : updateActiveTabIndex(tabIndex);
                    }}
                    data-cy={`${tab.name}-btn`}
                  >
                    <div className={getTabIconClassNames(tabs.length, tabIndex === activeTabIndex)}>
                      <Icon
                        name={tab.iconName}
                        className={`${tab.disabled && 'ohif-disabled'}`}
                        style={{
                          width: '22px',
                          height: '22px',
                        }}
                      ></Icon>
                    </div>
                  </div>
                </Tooltip>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const getOneTabComponent = () => {
    return (
      <div
        className={classnames(
          'text-primary-active flex	 grow cursor-pointer select-none justify-center self-center text-[13px]'
        )}
        style={{
          ...(side === 'left'
            ? { marginLeft: `${closeIconWidth}px` }
            : { marginRight: `${closeIconWidth}px` }),
        }}
        data-cy={`${tabs[0].name}-btn`}
        onClick={() => updatePanelOpen(!panelOpen)}
      >
        {/* <span>{tabs[0].label}</span> */}
      </div>
    );
  };

  const getOpenStateComponent = () => {
    return (
      <div className="flex select-none rounded-t border-[#323132]	py-1.5">
        {getCloseIcon()}
        {tabs.length === 1 ? getOneTabComponent() : getTabGridComponent()}
      </div>
    );
  };

  return (
    <div
      className={classnames(className, baseClasses, classesMap[openStatus][side])}
      style={style}
    >
      {panelOpen ? (
        <>
          <div className="divide-y divide-[#323132] rounded-xl bg-[#1C1C1E] flex flex-col max-h-full border border-[#323132]">
            {getOpenStateComponent()}
            {tabs.map((tab, tabIndex) => {
              if (tabIndex === activeTabIndex) {
                return <tab.content key={tabIndex} />;
              }
              return null;
            })}
          </div>
        </>
      ) : (
        <React.Fragment>{getCloseStateComponent()}</React.Fragment>
      )}
    </div>
  );
};

SidePanel.defaultProps = {
  defaultComponentOpen: null,
  activeTabIndex: null, // the default is to close the side panel
};

SidePanel.propTypes = {
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  className: PropTypes.string,
  activeTabIndex: PropTypes.number,
  tabs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        iconName: PropTypes.string.isRequired,
        iconLabel: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        content: PropTypes.func, // TODO: Should be node, but it keeps complaining?
      })
    ),
  ]),
  onOpen: PropTypes.func,
  onActiveTabIndexChange: PropTypes.func,
  expandedWidth: PropTypes.number,
};

export default SidePanel;
