/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/** @type {AppTypes.Config} */
window.getAuthenticationToken = () => {
  const store = localStorage.getItem('auth-storage');
  const parsedStore = JSON.parse(store);
  const token = parsedStore?.state?.token;
  console.log('token', token);
  return token;
};

window.config = {
  routerBasename: '/viewer',
  extensions: [],
  modes: [],
  showStudyList: true,
  authentication: {
    useNonURLBearerToken: true,
    getToken: window.getAuthenticationToken,
  },
  // below flag is for performance reasons, but it might not work for all servers
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  // filterQueryParam: false,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'dcmjs DICOMWeb Server',
        name: 'DCM4CHEE',
        wadoUriRoot: 'https://dicom.xenrad.ng/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'https://dicom.xenrad.ng/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'https://dicom.xenrad.ng/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadouri',
        thumbnailRendering: 'wadouri',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: false,
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
  ],
};
