export const priceFormatter = (price: number) => {
  if(!price) return 0;
  
  const numberFormat = Intl.NumberFormat("en", { notation: "compact" })
  return numberFormat.format(price);
}