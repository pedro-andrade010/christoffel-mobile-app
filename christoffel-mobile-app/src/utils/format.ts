// Shows a price the same way everywhere in the app, e.g. R85.50
export function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}
