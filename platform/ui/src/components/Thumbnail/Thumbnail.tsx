import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import Icon from '../Icon';
import { StringNumber } from '../../types';
import DisplaySetMessageListTooltip from '../DisplaySetMessageListTooltip';

/**
 * Display a thumbnail for a display set.
 */
const Thumbnail = ({
  displaySetInstanceUID,
  className,
  imageSrc,
  imageAltText,
  description,
  seriesNumber,
  numInstances,
  countIcon,
  messages,
  dragData,
  isActive,
  onClick,
  onDoubleClick,
}): React.ReactNode => {
  // TODO: We should wrap our thumbnail to create a "DraggableThumbnail", as
  // this will still allow for "drag", even if there is no drop target for the
  // specified item.
  const [collectedProps, drag, dragPreview] = useDrag({
    type: 'displayset',
    item: { ...dragData },
    canDrag: function (monitor) {
      return Object.keys(dragData).length !== 0;
    },
  });

  const [lastTap, setLastTap] = useState(0);

  const handleTouchEnd = e => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      onDoubleClick(e);
    } else {
      onClick(e);
    }
    setLastTap(currentTime);
  };

  return (
    <div
      className={classnames(
        className,
        'group flex flex-1 cursor-pointer select-none flex-col rounded-lg border border-[#323132] p-2 outline-none'
      )}
      id={`thumbnail-${displaySetInstanceUID}`}
      data-cy={`study-browser-thumbnail`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex="0"
    >
      <div ref={drag}>
        <div
          className={classnames(
            'flex h-20 flex-1 items-center justify-center overflow-hidden rounded-md bg-[#090909] text-base text-white',
            isActive
              ? 'border-primary-light/50 border-2'
              : 'border border-[#424040] hover:border-blue-300/50'
          )}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAltText}
              className="h-full w-full object-contain"
              crossOrigin="anonymous"
            />
          ) : (
            <div>{imageAltText}</div>
          )}
        </div>
        <div className="mt-2 flex flex-1 flex-row items-center rounded-lg border border-[#323132] px-2 py-1 text-base text-blue-300">
          <div className="mr-4">
            <span className="text-primary-main font-bold">{'S: '}</span>
            {seriesNumber}
          </div>
          <div className="flex flex-1 flex-row items-center">
            <Icon
              name={countIcon || 'group-layers'}
              className="mr-2 w-3"
            />
            {` ${numInstances}`}
          </div>
          <div className="opacity-55">
            <DisplaySetMessageListTooltip
              messages={messages}
              id={`display-set-tooltip-${displaySetInstanceUID}`}
            />
          </div>
        </div>
        {description && (
          <div className="mt-1 break-all rounded-lg border border-[#323132] px-2 py-1 text-base text-white/70">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

Thumbnail.propTypes = {
  displaySetInstanceUID: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  /**
   * Data the thumbnail should expose to a receiving drop target. Use a matching
   * `dragData.type` to identify which targets can receive this draggable item.
   * If this is not set, drag-n-drop will be disabled for this thumbnail.
   *
   * Ref: https://react-dnd.github.io/react-dnd/docs/api/use-drag#specification-object-members
   */
  dragData: PropTypes.shape({
    /** Must match the "type" a dropTarget expects */
    type: PropTypes.string.isRequired,
  }),
  imageAltText: PropTypes.string,
  description: PropTypes.string.isRequired,
  seriesNumber: StringNumber.isRequired,
  numInstances: PropTypes.number.isRequired,
  messages: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  dragData: {},
};

export default Thumbnail;
