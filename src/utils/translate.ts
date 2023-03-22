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

export const statusWorkOrder: Map = {
  completed: "Completo",
  "in progress": "Em progresso",
}

export const priorityWorkOrder: Map = {
  high: "Alta",
  low: "Baixa",
}
