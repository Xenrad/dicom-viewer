import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Button, { ButtonEnums } from '../Button';

export enum showDialogOption {
  NeverShowDialog = 'never',
  AlwaysShowDialog = 'always',
  ShowOnceAndConfigure = 'configure',
}

const InvestigationalUseDialog = ({ dialogConfiguration }) => {
  const { option, days } = dialogConfiguration;
  const [isHidden, setIsHidden] = useState(true);

  const handleConfirmAndHide = () => {
    const expiryDate = new Date();

    switch (option) {
      case showDialogOption.ShowOnceAndConfigure:
        expiryDate.setDate(expiryDate.getDate() + days);
        localStorage.setItem('investigationalUseDialog', JSON.stringify({ expiryDate }));
        break;
      case showDialogOption.AlwaysShowDialog:
        sessionStorage.setItem('investigationalUseDialog', 'hidden');
        break;
    }
    setIsHidden(true);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="fixed bottom-2 z-50 flex h-[86px] w-full justify-center">
      <div className="bg-secondary-dark border-primary-dark flex w-[90%] items-center justify-between rounded-lg border-2 pl-[22px] pr-[22px] pt-[10px] pb-[10px] shadow-lg">
        <div className="flex items-center gap-4">
          <Icon
            name="illustration-investigational-use"
            className="h-18 w-18"
          />
          <div className="flex flex-col">
            <div className="text-[19px] text-white">
              OHIF Viewer is{' '}
              <span className="text-primary-light">for investigational use only</span>
            </div>
            <div className="text-[13px] text-white">
              <span
                className="text-primary-active cursor-pointer"
                onClick={() => window.open('https://ohif.org/', '_blank')}
              >
                Learn more about OHIF Viewer
              </span>
            </div>
          </div>
        </div>
        <Button
          type={ButtonEnums.type.primary}
          onClick={handleConfirmAndHide}
          className="bg-primary-main"
        >
          Confirm and Hide
        </Button>
      </div>
    </div>
  );
};

InvestigationalUseDialog.propTypes = {
  dialogConfiguration: PropTypes.shape({
    option: PropTypes.oneOf(Object.values(showDialogOption)).isRequired,
    days: PropTypes.number,
  }).isRequired,
};

InvestigationalUseDialog.defaultProps = {
  dialogConfiguration: {
    option: showDialogOption.AlwaysShowDialog,
  },
};

export default InvestigationalUseDialog;
