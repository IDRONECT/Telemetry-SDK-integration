import { Feature, LineString } from 'geojson'
import React, { useState } from 'react'
import { Point } from 'telemetry-sdk'
import { api } from './api/instantiateApi'
import ApiKeyForm from './components/ApiKeyForm'
import UploadKmlFile from './components/upload/UploadKmlFile'
import useInterval from './hooks/useInterval'

const App: React.FunctionComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [pathToReplay, setPathToReplay] = useState<Feature<LineString> | null>()
  const [telemetryId, setTelemetryId] = useState<string | null>()
  const [pointIndex, setPointIndex] = useState<number>(0)
  const [running, setRunning] = useState<boolean>(false)
  const [aircraftId, setAircraftId] = useState<string>('')

  const sendPoint = (latitude: number, longitude: number, altitude: number): void => {
    if (!telemetryId) {
      return
    }

    const point: Point = { lat: latitude, lng: longitude, alt: altitude, batt: 100, sats: 14 }

    api.telemetryDataPost({ body: { telemetryId, point } })
  }

  const onReplayStart = async (): Promise<void> => {
    let response
    try {
      response = await api.telemetryStartPost({ body: { aircraftId, trackerId: '' } })
      const telemetryId = response.data?.telemetryId

      setTelemetryId(telemetryId)
      setRunning(true)

      console.log(`Telemetry has started with id ${telemetryId}`)
    } catch (err) {
      console.error(err)
      if (err.body.message.includes('telemetry active')) {
        onReplayStop(err.body.data.telemetryId)
        alert('There was already a telemetry active for this entity. We stopped it for you. Please try again.')
        return
      }
    }
  }

  const onReplayStop = async (telemtry = telemetryId) => {
    if (!telemtry) {
      return
    }

    await api.telemetryStopPost({ body: { telemetryId: telemtry } })
    setRunning(false)
    setPointIndex(0)
    setTelemetryId(null)
  }

  useInterval(() => {
    if (!running) {
      return
    }

    const pointToSend = pathToReplay?.geometry.coordinates[pointIndex]

    if (!pointToSend) {
      onReplayStop()
      alert('No points to send anymore')
      return
    }

    console.log(pointToSend, pointIndex)

    sendPoint(pointToSend[1], pointToSend[0], pointToSend[2])
    setPointIndex(prev => prev + 1)
  }, 1000)

  return (
    <div>
      <ApiKeyForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <button type="button" onClick={() => (window.location.href = `${window.location.href}data/demo.kml`)}>
        Download demo file
      </button>
      <br />
      <br />

      {loggedIn && (
        <>
          <input value={aircraftId} onChange={e => setAircraftId(e.target.value)} placeholder="Enter aircraftId" />
          <br />
          {!pathToReplay && <UploadKmlFile onSelect={setPathToReplay} />}
          {pathToReplay && (
            <>
              Selected path: {pathToReplay?.properties?.name}
              <br />
              <button onClick={() => setPathToReplay(null)}>Unselect</button>
              <br />
              <button onClick={onReplayStart}>Start replay</button>
              <br />
              {running && (
                <>
                  <button onClick={() => onReplayStop()}>Stop replay</button>
                  <br />
                  <p>Active point: {pathToReplay?.geometry.coordinates[pointIndex]} </p>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default App
