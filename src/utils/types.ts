export type AssetProps = {
  assignedUserIds?: number[]
  companyId: number
  healthHistory?: {
    status?: string
    timestamp?: string
  }[]
  healthscore: number
  id?: number
  image?: string
  metrics?: {
    lastUptimeAt?: string
    totalCollectsUptime?: number
    totalUptime?: number
  }
  model: string
  name: string
  sensors?: string[]
  specifications?: {
    maxTemp?: number
  }
  status: string
  unitId?: number
}

export type UserProps = {
  companyId: number
  email: string
  id: number
  name: string
  unitId: number
}

export type UnitProps = {
  companyId: number
  id: number
  name: string
}

export type CompanyProps = {
  name: string
  id: number
}

export type WorkOrderProps = {
  assetId: number
  assignedUserIds?: number[]
  checklist: {
    completed: boolean
    task: string
  }[]
  description: string
  id?: number
  priority: string
  status: string
  title: string
}
