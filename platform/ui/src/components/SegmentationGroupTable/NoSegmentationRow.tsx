import React from 'react';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

function NoSegmentationRow({ onSegmentationAdd, addSegmentationClassName }) {
  const { t } = useTranslation('SegmentationTable');
  return (
    <div
      className={`group ${addSegmentationClassName}`}
      onClick={onSegmentationAdd}
    >
      <div className="flex items-center rounded-[4px] p-3 group-hover:cursor-pointer">
        <span className="hover:bg-primary-light/50 border-primary-light/50 w-full rounded-md border p-2 py-2 text-xs uppercase text-white flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" />
          {t('Add segmentation')}
        </span>
      </div>
    </div>
  );
}

export default NoSegmentationRow;
