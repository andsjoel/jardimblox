import { Client, Account, Databases, Storage } from 'appwrite';

// Criação do cliente
export const client = new Client();

const APPWRITE_ENDPOINT = process.env.REACT_APP_APPWRITE_ENDPOINT;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

// Definir o endpoint e o projeto (já está configurado)
client
  .setEndpoint(APPWRITE_ENDPOINT) // Defina o endpoint do Appwrite (não modifique)
  .setProject(PROJECT_ID); // Substitua com seu Project ID

// Instâncias dos serviços Appwrite
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Exportando o ID para uso em documentos
export { ID } from 'appwrite';
