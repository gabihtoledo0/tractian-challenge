type Map = {
  [key: string]: string | undefined
}

export const statusAssets: Map = {
  inAlert: "Em Alerta",
  inDowntime: "Em Tempo de Inatividade",
  inOperation: "Em Operação",
  unplannedStop: "Parada Não Planejada",
  plannedStop: "Parada Planejada",
}
