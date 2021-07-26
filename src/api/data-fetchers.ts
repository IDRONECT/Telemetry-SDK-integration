import { ListResponseData } from 'telemetry-sdk'
import { api } from './instantiateApi'

const getTelemetries = async (): Promise<ListResponseData | undefined> => {
  const telemetries = await api.telemetryListGet({})

  return telemetries.data
}

export { getTelemetries }
