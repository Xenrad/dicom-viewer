import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ohif/ui';
import { utils } from '@ohif/core';
import { PatientInfoVisibility } from '../../types';

const { formatDate, formatPN } = utils;

const formatWithEllipsis = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

function usePatientInfo(servicesManager: AppTypes.ServicesManager) {
  const { displaySetService } = servicesManager.services;

  const [patientInfo, setPatientInfo] = useState({
    PatientName: '',
    PatientID: '',
    PatientSex: '',
    PatientDOB: '',
  });
  const [isMixedPatients, setIsMixedPatients] = useState(false);
  const displaySets = displaySetService.getActiveDisplaySets();

  const checkMixedPatients = PatientID => {
    const displaySets = displaySetService.getActiveDisplaySets();
    let isMixedPatients = false;
    displaySets.forEach(displaySet => {
      const instance = displaySet?.instances?.[0] || displaySet?.instance;
      if (!instance) {
        return;
      }
      if (instance.PatientID !== PatientID) {
        isMixedPatients = true;
      }
    });
    setIsMixedPatients(isMixedPatients);
  };

  const updatePatientInfo = () => {
    const displaySet = displaySets[0];
    const instance = displaySet?.instances?.[0] || displaySet?.instance;
    if (!instance) {
      return;
    }
    setPatientInfo({
      PatientID: instance.PatientID || null,
      PatientName: instance.PatientName ? formatPN(instance.PatientName.Alphabetic) : null,
      PatientSex: instance.PatientSex || null,
      PatientDOB: formatDate(instance.PatientBirthDate) || null,
    });
    checkMixedPatients(instance.PatientID || null);
  };

  useEffect(() => {
    const subscription = displaySetService.subscribe(
      displaySetService.EVENTS.DISPLAY_SETS_ADDED,
      () => updatePatientInfo()
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    updatePatientInfo();
  }, [displaySets]);

  return { patientInfo, isMixedPatients };
}

function HeaderPatientInfo({ servicesManager, appConfig }: withAppTypes) {
  const initialExpandedState =
    appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE ||
    appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
  const [expanded, setExpanded] = useState(initialExpandedState);
  const { patientInfo, isMixedPatients } = usePatientInfo(servicesManager);

  useEffect(() => {
    if (isMixedPatients && expanded) {
      setExpanded(false);
    }
  }, [isMixedPatients, expanded]);

  const handleOnClick = () => {
    if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
      setExpanded(!expanded);
    }
  };

  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);

  return (
    <div
      className="hover:bg-[#1c1c1e] border-[#323132] flex cursor-pointer items-center justify-center gap-1 rounded-lg border pl-3"
      onClick={handleOnClick}
    >
      <Icon
        name={isMixedPatients ? 'icon-multiple-patients' : 'icon-patient'}
        className="text-primary-light"
      />
      <div className="flex flex-col justify-center">
        {expanded ? (
          <div className="flex flex-col justify-center py-1">
            <div className="self-start text-sm font-bold text-white">
              {formattedPatientName}
            </div>
            <div className="text-aqua-pale flex gap-2 text-[11px]">
              <div>{formattedPatientID}</div>
              <div>{patientInfo.PatientSex}</div>
              <div>{patientInfo.PatientDOB}</div>
            </div>
          </div>
        ) : (
          <div className="text-primary-light self-center text-sm py-2.5">
            {' '}
            {isMixedPatients ? 'Multiple Patients' : 'Patient Information'}
          </div>
        )}
      </div>
      <Icon
        name="icon-chevron-patient"
        className={`text-primary-light ${expanded ? 'rotate-180' : ''}`}
      />
    </div>
  );
}

HeaderPatientInfo.propTypes = {
  servicesManager: PropTypes.object.isRequired,
};

export default HeaderPatientInfo;
