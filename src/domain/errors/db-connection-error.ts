export class DBConnectionError extends Error {
  constructor(
    message: string = 'Erro de conexão com o banco de dados. Por favor, tente novamente mais tarde.',
  ) {
    super(message);
    this.name = 'DBConnectionError';
  }
}
