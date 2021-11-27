import dateFormat, { i18n } from "dateformat";

i18n.monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const formatDate = (date: string): string => {
  const dateObject = new Date(date)
  const dateFormatted = dateFormat(dateObject, 'dd mmmm, yyyy')
  return dateFormatted
}

export { formatDate }