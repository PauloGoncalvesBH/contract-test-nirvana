
## Consultoria Harllen

### Vantagens

- Detectar durante o desenvolvimento se a aplicação vai comportar corretameentee com o que está em produção.
- Visibilidade de todo o microsserviço.

## Links
- https://pactflow.io/how-pact-works/#slide-2
- [Lib NPM @pact-foundation/pact](https://www.npmjs.com/package/@pact-foundation/pact)
- Doc do addInteraction.
- [Matchers](https://www.npmjs.com/package/@pact-foundation/pact#matching)
- Imagem de estratégia de testes - [Medium Samy](https://medium.com/assertqualityassurance/abordagem-de-testes-212b6238f0c3)
- Teste objetivo - [repositório nirvana teste de contrato](https://github.com/PauloGoncalvesBH/nirvana-teste-de-contrato)
- [Medium - Como usar spread operator](https://medium.com/coding-at-dawn/how-to-use-the-spread-operator-in-javascript-b9e4a8b06fab)

## Consumer
- O teste deve ser exatamente como o consumer consome o provider. Criar teste apenas das rotas que consome e exatamente da maneira que consome.
- Separação de arquivos deve ser por verbo e rota.

## Container

- Sempre criar volume do logs

## Outros
- Teste de contrato do consumer TEM que ser critério de aceite de task que atua em API.

## matchers
- eachLike = array com min 1 objeto
- like = objeto
- term = opções
