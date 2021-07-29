import { Feature, LineString } from 'geojson'
import React from 'react'

interface IProps {
  path: Feature<LineString>
  onSelect: (path: Feature<LineString>) => void
}

const PathDetailsBlock: React.FunctionComponent<IProps> = ({ path, onSelect }: IProps) => {
  return (
    <div style={{ border: 'gray solid 1px', padding: 15 }}>
      Name: {path?.properties?.name}
      <br />
      <button onClick={() => onSelect(path)}>Replay this path</button>
    </div>
  )
}

export default PathDetailsBlock
