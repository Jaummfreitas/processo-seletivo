# Desafio Tecnico
> Desenvolvido para o desafio técnico da DTI digital. Nessa aplicação é possível testar o frontend interagindo com os elementos na página de
login do site "Automation Practice"

### Especificações 💻

- Criar 3 cenários de teste
- Automatizar os cenários de teste criados
- Framework utilizado: Cypress
- IDE: VSCode
- Funcionalidade: Página de Login

## Cenário: Submetendo um registro de conta com entradas já existentes
- Dado que o usuário esteja na página "authentication"
- Quando o usuário digitar "test@gmail.com" no campo de email do formulário de registro
- Então o usuário deve clicar no botão "Create an account"
- Então a página deve retornar a mensagem "An account using this email address has already been registered. Please enter a valid password or request a new one." para o usuário
- E então a página deve retornar um ícone de sucesso verde no campo de email
