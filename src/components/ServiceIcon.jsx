import React from 'react'
import PropTypes from 'prop-types'
import { IconIO } from './Icon';

const ServiceIcon = props => {

  let {hidden, containerClass, hasIO, ...rest} = props

  return (
    <div hidden={hidden} className={`service-icon-wrapper  text-center ${containerClass || ''}`} >
      {
        hasIO
        ? <div data-badge >
            <IconIO title="Has IO" className="io-badge"/>
          </div>
        : ''
      }
      
      <img 
        className={`service-icon ${rest.className || ''}`}
        {...rest}
      />
    </div>
  )
}


ServiceIcon.propTypes = {
  hidden: PropTypes.bool,
  containerClass: PropTypes.any,
  src: PropTypes.any.isRequired
}

export default React.memo(ServiceIcon)