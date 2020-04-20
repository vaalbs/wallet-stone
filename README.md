# Wallet Stone

Projeto de carteiras virtuais de criptomoedas. Foram utilizadas duas criptomoedas Brita, que utiliza o valor do dólar, e a Bitcoin. Para obter as informações foram feitas requisições para as seguintes APIs:

- [Economia Awesome API](https://economia.awesomeapi.com.br/)
- [API - Dados Abertos – BCB - Banco Central do Brasil](https://olinda.bcb.gov.br)

Sobre as operações financeiras de criptomoedas, é correto afirmar que:

- Todo cliente ao se cadastrar recebe R\$ 100.000,00 (cem mil reais) em conta para comprar Bitcoins e Britas.

- O cliente pode vender suas criptomoedas ou trocar uma pela outra.

- O cliente precisa saber o saldo discriminado por cada moeda.

- O cliente precisa ter um extrato de operações financeiras.

Além disso, são exibidos gráficos do mês anterior e do penúltimo mês tendo como o eixo X os dias do mês e o eixo Y os valores de compra. Os gráficos da Brita estão vindo sem os finais de semana por não terem valores nesses dias.

### Inconsistências

Durante o desenvolvimento do projeto a API da Brita apresentou instabilidades, dito isso, quando a API dá erro o valor da Brita será de R\$4,50.

## Como iniciar o projeto

1. Clone o repositório: git clone https://github.com/vaalbs/wallet-stone.git
2. Acesse a pasta: cd wallet-stone
3. Instale as dependências (use npm): npm i
4. Rode a aplicação: npm start
5. Abra [http://localhost:3000](http://localhost:3000) para visuliazar no browser

## Tecnologias utilizadas

- React Hooks
- Typescript
- Styled components
- Ant Design
- Firebase
