import { Client, Account, Databases, Storage } from 'appwrite';

// Criação do cliente
export const client = new Client();

// Definir o endpoint e o projeto (já está configurado)
client
  .setEndpoint('https://nyc.cloud.appwrite.io/v1') // Defina o endpoint do Appwrite (não modifique)
  .setProject('685de4f1000ea5dc2d4d'); // Substitua com seu Project ID

// Instâncias dos serviços Appwrite
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Exportando o ID para uso em documentos
export { ID } from 'appwrite';
