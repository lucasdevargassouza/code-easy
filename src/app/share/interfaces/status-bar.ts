export interface StatusBar {
  status: TypeOfStatus;
  message: string;
  color: string;
  isShowLoadingBar: Boolean;
}

enum TypeOfStatus {
  EscutandoApi,
  ApiFinalizada,
  ApiNaoIniciada
}
