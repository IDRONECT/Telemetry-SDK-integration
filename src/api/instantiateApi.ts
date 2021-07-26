import { createConfiguration } from 'telemetry-sdk'
import { ObjectTelemetryApi } from 'telemetry-sdk/dist/types/ObjectParamAPI'

let api: ObjectTelemetryApi

const instantiateApi = async (secret: string): Promise<boolean> => {
  const configParams = { authMethods: { SECRET: secret } }
  const configuration = createConfiguration(configParams)

  api = new ObjectTelemetryApi(configuration)

  try {
    await api.telemetryListGet({})
    return true
  } catch (err) {
    return false
  }
}

export { instantiateApi, api }
