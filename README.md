<p align="center">
  <img src="https://i.ibb.co/TcRs6mJ/2e4fe184-7bdd-4498-ae84-d88d4c00fc71.jpg" height="200px" alt="Logo">


</p>
<div align="center">

[![Build](https://img.shields.io/gitlab/pipeline/andrewlucas/2019-2-Over26-Backend/devel)](https://gitlab.com/andrewlucas/2019-2-Over26-Backend/pipelines)
[![Test Coverage](https://api.codeclimate.com/v1/badges/28f335f2929225013dde/test_coverage)](https://codeclimate.com/github/fga-eps-mds/2019.2-Over26-Backend/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/28f335f2929225013dde/maintainability)](https://codeclimate.com/github/fga-eps-mds/2019.2-Over26-Backend/maintainability)
</div>
<h1 align="center">API Over26 - Uma nova experiência de cheque especial </h1> 

<h3 align="center">Tenha 26 dias sem juros para pagar a sua dívida. Você não vai ficar fora dessa, né?</h3>

<p align="center">
    Fique por dentro do que estamos aprontando!<a href="https://fga-eps-mds.github.io/2019.2-Over26/#/"><strong> Visite a nossa página!</strong></a>
  </p>

  <p align="center">
 <a href="https://github.com/fga-eps-mds/2019.2-Over26/#/"><strong> Visite o repositório da nossa aplicativo mobile</strong></a>
</p>
  
## Sobre o projeto

<p align="justify">
  O Over26 consiste em um Mínimo Produto viável (MVP) para o teste de uma nova experiência de crédito por meio do cheque especial em uma conta de pagamento. O objetivo deste produto consiste em estabelecer um melhor resultado em termos de experiência de usuário e usabilidade para a oferta do serviço no Brasil.
</p>

### Principais funcionalidades

<p align="justify"> 
  Considerando o objetivo do produto, existe um conjunto de funcionalidades de maior importância, são elas:
  
  * Contratação do serviço de Cheque Especial;
  * Ativação do cheque especial;
  * Aumento do limite máximo de crédito;
  * Escolha do limite de crédito a ser utilizado; 
  * Parcelamento da dívida no vigésimo sétimo dia; 
  * Acompanhamento das dívidas;
</p>

## Para colaborar
Interessado no nosso produto? Deseja contribuir no desenvolvimento de uma nova experiência de cheque especial? Você está no lugar certo. Se você deseja contribuir com o nosso produto, talvez queira começar sabendo um pouco mais no nosso [README](https://github.com/fga-eps-mds/2019.2-Over26) e no nosso [código de conduta](https://github.com/fga-eps-mds/2019.2-Over26/blob/master/.github/CODE_OF_CONDUCT.md). 

## Execução

### Desenvolvimento
Executar em modo desenvolvimento
```sh
[sudo] docker-compose up
```
Executar testes unitários
```sh
[sudo] docker-compose run --rm api npm run test:watch
```
Excutar lint (verificar folha de estilo)
```sh
[sudo] docker-compose run --rm api npm run lint
```
Executar em modo produção
```sh
[sudo] docker-compose -f docker-compose-production.yml up
```

O projeto conta com pipeline de entrega contínua, para saber mais detalhes, [acesse nossa documentação](https://fga-eps-mds.github.io/2019.2-Over26/#/documentation/continuous-delivery)

## Licença

[MIT License
](https://github.com/fga-eps-mds/2019.2-Over26-Backend/blob/master/LICENSE)
