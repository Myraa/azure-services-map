import React from 'react'
import PropTypes from 'prop-types'
import ServiceLinking from 'src/services/ServiceLinking';
import Modal from 'react-bootstrap/Modal';
import ServicesDirectIOInteractiveGraph from './ServicesDirectIOInteractiveGraph'
import D3CanvasControlNotice from 'src/components/D3CanvasControlNotice';
import { IconGraphRight } from 'src/components/Icon';
import TelemetryService from 'src/services/TelemetryService';

const ServicesDirectIOInteractiveGraphModal = props => {
 
  let {serviceId, ...rest} = props
  let ioTree = null

  const showServiceIntegrationTree = function(serviceId) {
    function buildChildren(id) {
      let services = ServiceLinking.services
      let service = services[id]
      let obj = {
        name: service ? service.name : id
      }
      circularRefTrack.push(id)

      if (service && service.servicesIO.output.length > 0){
        for (let i=0;i<service.servicesIO.output.length;i++){
          let servId = service.servicesIO.output[i].aliasTitle || service.servicesIO.output[i].serviceId;
          let depService = services[servId]
          let toInject = null;
          if (circularRefTrack.indexOf(servId) === -1 && depService) {
            toInject = buildChildren(servId)
          } else {
            toInject = {
              name: depService ? depService.name : servId
            }
            circularRefTrack.push(servId)
          }
          if (!obj.children){
            obj.children = []
          }
          obj.children.push(toInject)
          circularRefTrack.pop()
        }
      }

      return obj;
    }

    var circularRefTrack = [];
    
    ioTree = buildChildren(serviceId)

  }

  showServiceIntegrationTree(serviceId)

  if (null === ioTree) {
    return ''
  }

  TelemetryService.trackPageView('ServicesDirectIOInteractiveGraphModal', {serviceId})

  return (
    <>
       <Modal
        id="ServicesDirectIOInteractiveGraph"
        show={props.show}
        size="xl"
        {...rest}
      >
        <Modal.Header closeButton>
          <Modal.Title >
            <IconGraphRight /> IO graph
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ServicesDirectIOInteractiveGraph
            ioTree={ioTree}
          />
          <D3CanvasControlNotice />
        </Modal.Body>

      </Modal>
    </>
  )
}

ServicesDirectIOInteractiveGraphModal.propTypes = {
  serviceId: PropTypes.string.isRequired
}

export default React.memo(ServicesDirectIOInteractiveGraphModal);