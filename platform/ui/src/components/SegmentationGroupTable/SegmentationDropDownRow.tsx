import React from 'react';
import { Select, Icon, Dropdown, Tooltip } from '../../components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CircleEllipsis, Eye, EyeOff, Info, ChevronDown, Divide } from 'lucide-react';

function SegmentationDropDownRow({
  segmentations = [],
  activeSegmentation,
  onActiveSegmentationChange,
  disableEditing,
  onToggleSegmentationVisibility,
  onSegmentationEdit,
  onSegmentationDownload,
  onSegmentationDownloadRTSS,
  storeSegmentation,
  onSegmentationDelete,
  onSegmentationAdd,
  addSegmentationClassName,
}) {
  const handleChange = option => {
    onActiveSegmentationChange(option.value); // Notify the parent
  };

  const selectOptions = segmentations.map(s => ({
    value: s.id,
    label: s.label,
  }));
  const { t } = useTranslation('SegmentationTable');

  if (!activeSegmentation) {
    return null;
  }

  return (
    <div className="group flex flex-col gap-y-2 border-b border-[#323132] py-2 px-4 gap-1">
      {selectOptions?.length && (
        <Select
          id="segmentation-select"
          isClearable={false}
          onChange={handleChange}
          components={{
            DropdownIndicator: () => (
              <div className="pr-2">
                <ChevronDown size={16} className="text-white/70" />
              </div>
            ),
          }}
          isSearchable={false}
          options={selectOptions}
          value={selectOptions?.find(o => o.value === activeSegmentation.id)}
          className="h-9 text-xs uppercase"
        />
      )}
      <div className="flex items-center gap-2 justify-between">
     <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Dropdown
          id="segmentation-dropdown"
          showDropdownIcon={false}
          alignment="left"
          itemsClassName={`text-white/70 ${addSegmentationClassName}`}
          showBorders={false}
          maxCharactersPerLine={30}
          list={[
            ...(!disableEditing
              ? [
                  {
                    title: t('Add new segmentation'),
                    onClick: () => {
                      onSegmentationAdd();
                    },
                  },
                ]
              : []),
            ...(!disableEditing
              ? [
                  {
                    title: t('Rename'),
                    onClick: () => {
                      onSegmentationEdit(activeSegmentation.id);
                    },
                  },
                ]
              : []),
            {
              title: t('Delete'),
              onClick: () => {
                onSegmentationDelete(activeSegmentation.id);
              },
            },
            ...(!disableEditing
              ? [
                  {
                    title: t('Export DICOM SEG'),
                    onClick: () => {
                      storeSegmentation(activeSegmentation.id);
                    },
                  },
                ]
              : []),
            ...[
              {
                title: t('Download DICOM SEG'),
                onClick: () => {
                  onSegmentationDownload(activeSegmentation.id);
                },
              },
              {
                title: t('Download DICOM RTSTRUCT'),
                onClick: () => {
                  onSegmentationDownloadRTSS(activeSegmentation.id);
                },
              },
            ],
          ]}
        >
          <div className="h-7 w-7 cursor-pointer rounded-md grid place-items-center hover:bg-primary-light/50 border border-[#323132] hover:border-primary-light hover:border-transparent text-white/70 hover:text-black transition-all">
            <CircleEllipsis size={20}/>
          </div>
        </Dropdown>
      </div>
        <div className="flex gap-2">
        <Tooltip
          className='w-7 h-7 rounded-md hover:bg-primary-light/50 border border-[#323132] hover:border-primary-light hover:border-transparent grid place-items-center hover:text-black transition-all text-white/70 cursor-pointer'
          position="bottom-right"
          content={
            <div className="flex flex-col">
              <div className="text-sm text-white/70">Series:</div>
              <div className="text-aqua-pale text-sm">{activeSegmentation.description}</div>
            </div>
          }
        >
          <Info size={20}/>
        </Tooltip>
        <div
          className="w-7 h-7 rounded-md hover:bg-primary-light/50 border border-[#323132] hover:border-primary-light hover:border-transparent grid place-items-center hover:text-black transition-all text-white/70 cursor-pointer"
          onClick={() => onToggleSegmentationVisibility(activeSegmentation.id)}
        >
          {activeSegmentation.isVisible ? (
            <Eye size={20}/>
          ) : (
            <EyeOff size={20}/>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

SegmentationDropDownRow.propTypes = {
  segmentations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeSegmentation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
  }),
  onActiveSegmentationChange: PropTypes.func.isRequired,
  disableEditing: PropTypes.bool,
  onToggleSegmentationVisibility: PropTypes.func,
  onSegmentationEdit: PropTypes.func,
  onSegmentationDownload: PropTypes.func,
  onSegmentationDownloadRTSS: PropTypes.func,
  storeSegmentation: PropTypes.func,
  onSegmentationDelete: PropTypes.func,
  onSegmentationAdd: PropTypes.func,
};

SegmentationDropDownRow.defaultProps = {
  segmentations: [],
  disableEditing: false,
};

export default SegmentationDropDownRow;
