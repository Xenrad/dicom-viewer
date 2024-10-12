import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import MeasurementItem from './MeasurementItem';

const MeasurementTable = ({
  data,
  title,
  onClick,
  onEdit,
  onDelete,
  servicesManager,
}: withAppTypes) => {
  const { customizationService, measurementService } = servicesManager.services;
  const { t } = useTranslation('MeasurementTable');
  const amount = data.length;

  const itemCustomization = customizationService.getCustomization('MeasurementItem', {
    content: MeasurementItem,
    contentProps: {},
  });
  const CustomMeasurementItem = itemCustomization.content;

  const onMeasurementDeleteHandler = ({ uid }) => {
    const measurement = measurementService.getMeasurement(uid);
    onDelete?.({ uid });
    measurementService.remove(
      uid,
      {
        ...measurement,
      },
      true
    );
  };

  return (
    <div>
      <div className="mt-[2px] flex cursor-pointer select-none items-center justify-between rounded-[4px] pl-4 text-[13px] border-b border-[#323132]">
        <div className="text-white py-3 font-bold uppercase">{t(title)}</div>
        <span className="text-white py-3 pr-4 font-bold uppercase">{amount}</span>
      </div>
      <div className="ohif-scrollbar max-h-112 flex flex-col gap-2 overflow-hidden p-4">
        {data.length !== 0 &&
          data.map((measurementItem, index) => (
            <CustomMeasurementItem
              key={measurementItem.uid}
              uid={measurementItem.uid}
              index={index + 1}
              label={measurementItem.label}
              isActive={measurementItem.isActive}
              displayText={measurementItem.displayText}
              item={measurementItem}
              onClick={onClick}
              onEdit={onEdit}
              onDelete={onMeasurementDeleteHandler}
            />
          ))}
        {data.length === 0 && (
          <div className="group flex cursor-default border border-transparent transition duration-300">
            <div className="flex flex-1 items-center justify-center rounded border border-[#323132] px-2 py-4">
              <span className="text-white/70 text-sm">
                {t('No tracked measurements')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MeasurementTable.defaultProps = {
  data: [],
  onClick: () => {},
  onEdit: () => {},
};

MeasurementTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      displayText: PropTypes.arrayOf(PropTypes.string),
      isActive: PropTypes.bool,
    })
  ),
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
};

export default MeasurementTable;
