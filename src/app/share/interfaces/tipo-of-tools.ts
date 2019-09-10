export enum EnumTypeOfTools {
  variable = 'variable',
  js = 'js',
  return = 'return',
}

export interface TipoOfTools {
  type: EnumTypeOfTools;
  comment: String;

  value: String;
}
