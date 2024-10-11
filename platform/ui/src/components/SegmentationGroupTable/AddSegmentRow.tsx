import React from 'react';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import {Plus} from "lucide-react"

function AddSegmentRow({ onClick, onToggleSegmentationVisibility = null, segmentation = null }) {
  const { t } = useTranslation('SegmentationTable');
  return (
    <div className="flex justify-between border-y border-[#323132] px-4 hover:cursor-pointer">
      <div
        className="group w-full py-2"
        onClick={onClick}
      >
        <div className="hover:bg-primary-light/50 border-primary-light/50 w-full flex items-center justify-center gap-2 rounded-md border p-2 py-1 text-[13px] capitalize text-white">
          <Plus className="h-4 w-4" />
          <span className="uppercase text-xs py-1">{t('Add segment')}</span>
        </div>
      </div>
      {segmentation && (
        <div className="flex items-center">
          <div
            className="hover:bg-secondary-dark ml-3 mr-1 grid h-[28px]  w-[28px] cursor-pointer place-items-center rounded-md"
            onClick={() => onToggleSegmentationVisibility(segmentation.id)}
          >
            {segmentation.isVisible ? (
              <Icon
                name="row-shown"
                className="text-primary-active"
              />
            ) : (
              <Icon
                name="row-hidden"
                className="text-primary-active"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSegmentRow;
