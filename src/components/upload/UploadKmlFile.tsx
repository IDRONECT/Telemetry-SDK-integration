import { Feature, LineString } from 'geojson'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import parseKmlFile from '../../helpers/parseKmlFile'
import FileUploader from '../common/FileUploader'
import PathDetailsBlock from '../paths/PathDetailsBlock'

interface Props {
  onSelect: (path: Feature<LineString>) => void
}

interface IState {
  paths: Array<Feature<LineString>>
}

const UploadKmlFile: React.FunctionComponent<Props> = ({ onSelect }: Props) => {
  const [state, setState] = useState<IState>({ paths: [] })

  const parseFile = async (file: File | undefined): Promise<void> => {
    if (!file) {
      return
    }

    const parsed = await parseKmlFile(file)

    console.log(parsed)

    if (!parsed?.features?.length) {
      alert('File does not contain any features')
      return
    }

    const paths = parsed.features.filter(feature => feature?.geometry?.type === 'LineString')

    console.log(paths)

    if (!paths.length) {
      alert('File contains geometry data but does not contain any path')
      return
    }

    setState({ paths })
  }

  return (
    <div style={{ border: 'black solid 1px', padding: 15 }}>
      <p>Upload a KML file to replay through the Telemetry SDK</p>
      <FileUploader onUpload={parseFile} />
      <br />

      {state.paths?.length ? (
        <ul>
          {state.paths.map(path => (
            <>
              <PathDetailsBlock key={uuidv4()} path={path} onSelect={onSelect} />
              <br />
            </>
          ))}
        </ul>
      ) : (
        <p>Upload a file to see the available paths</p>
      )}
    </div>
  )
}

export default UploadKmlFile
