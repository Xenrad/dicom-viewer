import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LayoutSelector({ onSelection, rows, columns }) {
  const [hoveredIndex, setHoveredIndex] = useState();
  const hoverX = hoveredIndex % columns;
  const hoverY = Math.floor(hoveredIndex / columns);
  const isHovered = index => {
    const x = index % columns;
    const y = Math.floor(index / columns);

    return x <= hoverX && y <= hoverY;
  };

  const gridSize = '20px ';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: gridSize.repeat(columns),
        gridTemplateRows: gridSize.repeat(rows),
      }}
    >
      {Array.apply(null, Array(rows * columns))
        .map(function (_, i) {
          return i;
        })
        .map(index => (
          <div
            key={index}
            className={`border-[#090909] border ${isHovered(index) ? 'bg-primary-light' : 'bg-[#1c1c1e]'} cursor-pointer`}
            data-cy={`Layout-${index % columns}-${Math.floor(index / columns)}`}
            onClick={() => {
              const x = index % columns;
              const y = Math.floor(index / columns);

              onSelection({
                numRows: y + 1,
                numCols: x + 1,
              });
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          ></div>
        ))}
    </div>
  );
}

LayoutSelector.defaultProps = {
  onSelection: () => {},
  columns: 4,
  rows: 3,
};

LayoutSelector.propTypes = {
  onSelection: PropTypes.func.isRequired,
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

export default LayoutSelector;
