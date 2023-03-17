import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"

type AssetsProps = {
  assignedUserIds: number[]
  companyId: string
  healthHistory: {
    status: string
    timestamp: string
  }[]
  healthscore: string
  id: string
  image: string
  metrics: {
    lastUptimeAt: string
    totalCollectsUptime: number
    totalUptime: number
  }
  model: string
  name: string
  sensors: string[]
  specifications: {
    maxTemp: number
  }
  status: string
  unitId: number
}

function Assets() {
  const [assets, setAssets] = useState<AssetsProps[]>()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL_ASSETS}`).then((response: AxiosResponse) => {
      setAssets(response.data)
    })
  }, [])

  return <div>{assets !== undefined && assets.map((asset) => asset.companyId)}</div>
}

export default Assets
