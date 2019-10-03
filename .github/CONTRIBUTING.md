# Contribuindo com o MVP Over26

Interessado no nosso produto? Deseja contribuir no desenvolvimento de uma nova experiência de cheque especial? Você está no lugar certo. Se você deseja contribuir com o nosso produto, talvez queira começar sabendo um pouco mais no nosso [README] e no nosso [código de conduta](). 

Esteja ciente que a sua contribuição é importante para nós! O que você está esperando? Deixe-nos saber como melhorar a nossa proposta. 

# Como eu posso contribuir?

## Reportando bugs 

* Este projeto possui um padrão para criação de [_Issue_](https://github.com/fga-eps-mds/2019.2-Grupo2/blob/master/.github/ISSUE_TEMPLATE.md). Logo, se você encontrar um bug, cheque se já se encontra cadastrado nas nossas [issues](https://github.com/fga-eps-mds/2019.2-Grupo2/issues), caso a resposta seja não, apenas abra uma [nova issue](https://github.com/fga-eps-mds/2019.2-Grupo2/issues/new) utilizando como tag a label __bug__.

## Sugerindo mudanças em funcionalidades existentes

* Primeiramente, verifique se não existe nenhuma issue já cadastrada que solicite essa modificação nas  [_Issues_](https://github.com/fga-eps-mds/2019.2-Grupo2/issues). 

* Se não existir, será preciso criar uma nova, com uma boa descrição da sugestão de mudança em [_Nova_Issue_](https://github.com/fga-eps-mds/2019.2-Grupo2/issues/new) e um título de fácil entendimento. Além disso, associe à issua a label __Improvement__.

* As suas mudanças devem ser submetidas por meio de [_Pull Requests_](https://github.com/fga-eps-mds/2019.2-Grupo2/pulls), que conta com um [_Template_](https://github.com/fga-eps-mds/2019.2-Grupo2/blob/master/.github/PULL_REQUEST_TEMPLATE.md).

# Padrão de Commmits 

## Para padronizar os commits no repositório, recomendamos que seja seguido o nosso estilo de commits, tal que: 

* Todos os commits devem possuir um título curto e objetivo que resuma o que foi feito no _commit_;

* Se você está trabalhando com outros colegas, forneça o co-authored-by no commit.

__Example:__

    Modificando layout do extrato da conta (Título curto e objetivo)

    Co-authored-by: João da Silva <eujoao@mail.com> (Assinatura do outro contribuidor)

# Política de Branches

Objetivando manter a confiabilidade do código fonte do nosso produto, propõe-se o uso de uma política de branches para orientar os desenvolvedores no modo de organização das suas contribuições neste repositório. Assim, estabelecemos:


branch padrão master, para hospedar o código estável do projeto (que estará em ambiente de produção);


__gh-pages__: Designada para conter todos os documentos do projeto, disponíveis no [Github Pages](https://fga-eps-mds.github.io/2019.2-Grupo2/#/)

* __`docs/nome_documento`__ - Branch onde será consolidada a documentação do projeto, sendo usada exclusivamente para isso.

* __`devel`__ - Branch destinada à integração das novas funcionalidades desenvolvidas, onde estarão as features em estágio avançado e/ou completas. Esta será a branch base para o desenvolvimento inicial de features e de correção de bugs. 

* __`hotfix/<nome_bug>`__ - Branch dedicada para correção de bugs presentes na aplicação. É preciso especificar o número da _issue_ cadastrada no repositório.
Exemplo: `hotfix/1-<nome_bug>` (_issue_ #1)

* __`feature/<feature-name>`__ - Branch usada para desenvolvimento de uma nova feature no projeto. O nome deve conter o número da issue registrada, no formato. 
Exemplo: `feature/1-<feature-name>` (_issue_ #1)

* __`release/<release-version>`__ - Branch destinada à ajustes finais/build que serão feitas para entrega de uma realize do software. O nome deve ser a própria versão da release. 

* __`improvement/<improvement-name>`__ - Branch usada para melhorar a usabilidade e outros aspectos das funcionalidade e/ou documentação do projeto. Deve possuir associado ao nome, o número da _issue_ inscrita no repositório.
Exemplo: `improvement/1-<improvement-name>` (_issue_ #1)

Para mais informações acesse [Estrutura de Branches e Padrões](https://fga-eps-mds.github.io/2019.2-Grupo2/#/branches-structure)

