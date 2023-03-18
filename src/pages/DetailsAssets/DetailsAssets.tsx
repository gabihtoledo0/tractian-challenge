import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import { AssetsProps } from "../../utils/types"

function Assets() {
  const [assets, setAssets] = useState<AssetsProps[]>()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL_ASSETS}`)
      .then((response: AxiosResponse) => {
        setAssets(response.data)
      })
  }, [])

  return (
    <div>{assets !== undefined && assets.map((asset) => asset.companyId)}</div>
  )
}

export default Assets
