export interface Stock {
  id : number,
  name : string,
  symbol : string,
  description : string,
  currentPrice : number,
  sector : string // TODO: Enum
}
