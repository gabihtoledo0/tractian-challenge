type Map = {
  [key: string]: string | undefined
}

export const statusAssets: Map = {
  inAlert: "Em alerta",
  inDowntime: "Em tempo de inatividade",
  inOperation: "Em operação",
  unplannedStop: "Parada não planejada",
  plannedStop: "Parada planejada",
}
