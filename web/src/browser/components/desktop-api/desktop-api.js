
import { useEffect } from 'react'
import { eventToHandler } from './desktop-api.utils'

const DEFAULT_INTEGRATION_POINT = window.neo4jDesktopApi

function DesktopApi({ integrationPoint = DEFAULT_INTEGRATION_POINT, ...rest }) {
  const getKerberosTicket =
    (integrationPoint && integrationPoint.getKerberosTicket) || undefined

  useEffect(() => {
    async function mountEvent() {
      if (integrationPoint && integrationPoint.getContext) {
        // Pull initial data and call handler if defined
        if (rest.onMount) {
          const context = await integrationPoint.getContext()
          rest.onMount('MOUNT', context, {}, getKerberosTicket)
        }
      }
    }

    function onUpdate() {
      if (integrationPoint && integrationPoint.onContextUpdate) {
        // Setup generic event listener
        integrationPoint.onContextUpdate((event, context, oldContext) => {
          const handlerName = eventToHandler(event.type)
          // If we have a prop that's interested in this event, call it
          if (handlerName && typeof rest[handlerName] !== 'undefined') {
            rest[handlerName](event, context, oldContext, getKerberosTicket)
          }
        })
      }
    }

    mountEvent()
    onUpdate()

    return () =>
      integrationPoint &&
      integrationPoint.onContextUpdate &&
      integrationPoint.onContextUpdate(null)
  }, [integrationPoint])
  return null
}

export default DesktopApi
