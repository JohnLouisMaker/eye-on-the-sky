export const formatarData = (dataString) => {
  if (!dataString) return "";
  const [ano, mes, dia] = dataString.split("-");
  return `${dia}/${mes}/${ano}`;
};
