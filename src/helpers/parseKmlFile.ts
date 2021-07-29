import { kml } from '@tmcw/togeojson'
import { Feature, LineString } from 'geojson'

interface Response {
  type: string
  features: Array<Feature<LineString>>
}

const parseKmlFile = async (file: File): Promise<Response> => {
  const xmlData = await file.text()
  const kmlData = kml(new DOMParser().parseFromString(xmlData, 'text/xml'))

  return kmlData
}

export default parseKmlFile
