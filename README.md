# Telemetry SDK Integration

This is a basic demo app to show how to easily integrate the IDRONECT Telemeyty SDK in your Javascript projects

## Run it locally

1. `npm install`
2. `npm start`

You can also try out this implementation on [CodeSandbox](https://codesandbox.io/s/github/IDRONECT/Telemetry-SDK-integration)

## Try it out

1. Enter your API key (<https://next.idronect.com/profile> -> Personal access tokens) and login
2. Enter your aircraft Id (<https://next.idronect.com/profile/drones> -> View an aircraft -> Copy the id located in the URL (e.g. bLMXEyxo6i8YWqzp7))
3. Upload a KML file or download the demo file and upload that one
4. Press Start Replay to start the data sending. You can see the result on the Idronect Map (and the telemetry menu on the bottom left of IDRONECT)
5. Stop the telemetry when you are done and replay the flight in your IDRONECT logbook (<https://next.idronect.com/flights>)

## Implemented features

This project implements the following features:

- API Authentication through the SDK (you need to provide your own API key)
- Starting and stopping a telemetry recording on an aircraft
- Sending location points
