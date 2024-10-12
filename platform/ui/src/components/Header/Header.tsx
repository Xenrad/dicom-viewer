import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import NavBar from '../NavBar';
import Svg from '../Svg';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Dropdown from '../Dropdown';
import HeaderPatientInfo from '../HeaderPatientInfo';
import { PatientInfoVisibility } from '../../types/PatientInfoVisibility';

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  showPatientInfo = PatientInfoVisibility.VISIBLE_COLLAPSED,
  servicesManager,
  Secondary,
  appConfig,
  ...props
}: withAppTypes): ReactNode {
  const { t } = useTranslation('Header');

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    window.close();
  };

  return (
    <NavBar
      isSticky={isSticky}
      {...props}
    >
      <div className="relative h-[64px] items-center py-2">
        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
          <div
            className={classNames(
              'mr-3 inline-flex items-center',
              isReturnEnabled && 'cursor-pointer'
            )}
            onClick={onClickReturn}
            data-cy="return-to-work-list"
          >
            {/* {isReturnEnabled && (
              <Icon
                name="cancel"
                className="text-primary-active/50 w-8"
              />
            )} */}
            {/* <div className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                width="32px"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 314 311"
              >
                <path
                  className="st0"
                  fill="#ffffff"
                  d="M155.5,289.1l0-45.7c-4.6,0-9.3-0.4-13.9-1.1l-7.2,45.1C141.4,288.6,148.5,289.1,155.5,289.1L155.5,289.1z   M176.5,287.5c7-1.1,13.9-2.7,20.6-4.9L183,239.1c-4.4,1.4-9,2.5-13.6,3.2L176.5,287.5z M113.9,282.6l14.1-43.4  c-4.4-1.4-8.7-3.2-12.9-5.3l-20.8,40.7C100.6,277.7,107.2,280.4,113.9,282.6z M216.6,274.6c6.3-3.2,12.3-6.9,18-11l-27-36.9  c-3.7,2.7-7.7,5.2-11.9,7.2L216.6,274.6z M76.3,263.5l27-36.9c-3.7-2.7-7.3-5.7-10.6-9l-32.4,32.3l0,0  C65.3,254.8,70.7,259.4,76.3,263.5z M250.5,250.1l0.3-0.3c5-4.9,9.6-10.3,13.7-15.9l-37-26.9c-2.7,3.7-5.8,7.3-9,10.5l-0.5,0.5  l15.6,14.7L250.5,250.1z M46.6,233.8l37-26.9c-2.7-3.7-5.2-7.7-7.3-11.8l-40.8,20.7C38.7,222.1,42.4,228.1,46.6,233.8L46.6,233.8z   M275.5,215.9c3.2-6.2,5.9-12.8,8.1-19.5L240,182.4c-1.4,4.4-3.2,8.7-5.3,12.8L275.5,215.9z M27.4,196.4L71,182.3  c-1.4-4.4-2.5-8.9-3.2-13.5l-45.3,7.1C23.6,182.8,25.3,189.7,27.4,196.4L27.4,196.4z M288.5,176c1.1-6.9,1.7-14,1.7-21l-45.8,0  c0,4.6-0.4,9.3-1.1,13.9L288.5,176z M66.7,154.9c0-4.6,0.4-9.3,1.1-13.9l-45.3-7.1c-1.1,6.9-1.6,14-1.7,21L66.7,154.9L66.7,154.9z   M243.3,141.1l45.3-7.1c-1.1-6.9-2.7-13.8-4.9-20.5l-43.6,14C241.5,132,242.6,136.5,243.3,141.1L243.3,141.1z M71,127.5  c1.4-4.4,3.2-8.7,5.3-12.8L35.5,94c-3.2,6.2-5.9,12.8-8.1,19.5L71,127.5L71,127.5z M234.8,114.8l40.9-20.7  c-3.2-6.3-6.9-12.3-11.1-18L227.5,103C230.2,106.7,232.7,110.7,234.8,114.8L234.8,114.8z M83.6,102.9c2.7-3.7,5.8-7.3,9.1-10.6  l0.1-0.1L60.4,59.9L60.3,60c-5,5-9.6,10.3-13.7,16L83.6,102.9z M218.5,92.5l9.8-9.9l22.5-22.4l-0.1-0.1c-5-4.9-10.3-9.5-15.9-13.6  l-27,36.9c3.7,2.7,7.3,5.7,10.5,9L218.5,92.5z M103.4,83.2c3.7-2.7,7.7-5.1,11.9-7.2L94.5,35.3c-6.3,3.2-12.3,6.9-18,11L103.4,83.2z   M196,76.1l20.9-40.7c-6.3-3.2-12.8-5.9-19.5-8.1l-14.2,43.4C187.5,72.2,191.8,74,196,76.1L196,76.1z M128.2,70.7  c4.4-1.4,9-2.5,13.6-3.2l-7.1-45.1c-6.9,1.1-13.9,2.7-20.6,4.9L128.2,70.7z M169.5,67.5l7.2-45.1c-6.9-1.1-14-1.7-21-1.7l0,45.7  C160.3,66.4,165,66.8,169.5,67.5z"
                />
                <path
                  className="st0"
                  fill="#ffffff"
                  d="M155.5,245.5v-45.9c-3.9,0-7.7-0.5-11.5-1.5l-12,44.3C139.7,244.4,147.6,245.5,155.5,245.5z M179,242.4  c7.7-2,15-5,21.9-9l-23.2-39.7c-3.3,1.9-6.9,3.4-10.6,4.4L179,242.4z M110.2,233.4l23.2-39.7c-3.3-1.9-6.4-4.3-9.2-7l-0.4-0.4  l-14.6,15.3l-18,17.3l0.3,0.3C97.1,224.7,103.4,229.5,110.2,233.4L110.2,233.4z M219.6,219.2L219.6,219.2  c5.6-5.6,10.5-11.8,14.4-18.6l-40.1-23c-1.9,3.3-4.3,6.3-7.1,9.1L219.6,219.2z M77,200.5l40.1-22.9c-1.9-3.3-3.4-6.8-4.4-10.5  L68,178.9C70,186.4,73.1,193.7,77,200.5z M243.1,179c2-7.6,3.1-15.4,3.1-23.2l-46.3,0c0,3.8-0.5,7.7-1.5,11.4L243.1,179z   M111.3,155.7c0-3.8,0.5-7.7,1.5-11.4L68,132.5c-2,7.6-3.1,15.4-3.1,23.2L111.3,155.7L111.3,155.7z M198.3,144.4l44.8-11.8  c-2-7.6-5.1-14.9-9-21.7l-40.1,22.9C195.8,137.2,197.3,140.7,198.3,144.4z M117.2,133.8c1.9-3.2,4.2-6.3,7-9l0.1-0.1l-16.6-16.4  L91.8,92l-0.3,0.3c-5.6,5.5-10.4,11.8-14.4,18.5L117.2,133.8z M107.7,108.3l0.2,0.2L107.7,108.3z M186.8,124.8l16.4-16.3L220,92.7  l-0.4-0.4C214,86.7,207.7,82,200.9,78l-23.2,39.7c3.3,1.9,6.3,4.2,9.1,6.9L186.8,124.8z M133.4,117.7c3.3-1.9,6.9-3.4,10.6-4.4  L132.2,69c-7.7,2-15,5-21.9,9L133.4,117.7z M167,113.4l12-44.3c-7.6-2-15.5-3.1-23.4-3.1l0,45.9C159.4,111.9,163.3,112.4,167,113.4  L167,113.4z"
                />
              </svg>
            </div> */}
          </div>
        </div>
        <div className="absolute top-1/2 left-[250px]  h-8 -translate-y-1/2">{Secondary}</div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="flex items-center justify-center space-x-2">{children}</div>
        </div>
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
          {showPatientInfo !== PatientInfoVisibility.DISABLED && (
            <HeaderPatientInfo
              servicesManager={servicesManager}
              appConfig={appConfig}
            />
          )}
          {/* <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
          <div className="flex-shrink-0">
            <Dropdown
              id="options"
              showDropdownIcon={false}
              list={menuOptions}
              alignment="right"
            >
              <IconButton
                id={'options-settings-icon'}
                variant="text"
                color="inherit"
                size="initial"
                className="text-primary-active hover:bg-primary-dark h-full w-full"
              >
                <Icon name="icon-settings" />
              </IconButton>
            </Dropdown>
          </div> */}
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.object,
  showPatientInfo: PropTypes.string,
  servicesManager: PropTypes.object,
};

Header.defaultProps = {
  isReturnEnabled: true,
  isSticky: false,
};

export default Header;
