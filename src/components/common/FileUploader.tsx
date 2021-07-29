import React from 'react'

interface Props {
  onUpload: (file: File | undefined) => void
}

const FileUploader: React.FunctionComponent<Props> = ({ onUpload }: Props) => (
  <input type="file" accept=".kml" onChange={e => onUpload(e.target?.files?.[0])} />
)

export default FileUploader
