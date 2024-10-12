import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Footer from './Footer';
import Body from './Body';
import Header from './Header';
import { useEffect } from 'react';

const Dialog = ({
  title,
  text,
  onClose,
  noCloseButton,
  actions,
  onShow,
  onSubmit,
  header: HeaderComponent,
  body: BodyComponent,
  footer: FooterComponent,
  value: defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  const theme = 'bg-[#090909]';
  const flex = 'flex flex-col';
  const border = 'border-2 border-[#323132] rounded-lg';
  const outline = 'outline-none focus:outline-none';
  const position = 'relative';
  const width = 'w-full';
  const padding = 'px-[20px] pb-[20px] pt-[13px]';

  useEffect(() => {
    if (onShow) {
      onShow();
    }
  }, [onShow]);

  return (
    <div className={classNames(theme, flex, border, outline, position, width, padding)}>
      <div className='uppercase'>
      <HeaderComponent
        title={title}
        noCloseButton={noCloseButton}
        onClose={onClose}
        value={value}
        setValue={setValue}
      />
      </div>
      <BodyComponent
        text={text}
        value={value}
        setValue={setValue}
      />
      <FooterComponent
        actions={actions}
        onSubmit={onSubmit}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  onClose: PropTypes.func,
  noCloseButton: PropTypes.bool,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  body: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.object,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.any,
      type: PropTypes.oneOf(['primary', 'secondary', 'cancel']).isRequired,
    })
  ).isRequired,
};

Dialog.defaultProps = {
  header: Header,
  footer: Footer,
  body: Body,
  value: {},
};

export default Dialog;
