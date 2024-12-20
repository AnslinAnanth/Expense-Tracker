export function formatIndianCurrency(value) {
  if (!value) return "";
  const lastThreeDigits = value.slice(-3);
  const otherDigits = value.slice(0, -3);
  const formattedOtherDigits = otherDigits.replace(
    /\B(?=(\d{2})+(?!\d))/g,
    ","
  );
  return otherDigits
    ? `${formattedOtherDigits},${lastThreeDigits}`
    : lastThreeDigits;
}
