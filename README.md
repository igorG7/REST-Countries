# Rest Countries 

## Visão Geral

O objetivo desse projeto foi construir uma aplicação que exibe uma lista de países e informações detalhadas sobre eles. Para a implementação, as seguintes tecnologias foram utilizadas: HTML (Linguagem de Marcação de Hipertexto), CSS (Folha de Estilo em Cascatas) e LESS como pré-processador, JavaScript como linguagem de programação, uma API para a comunicação e também JSON Server para simular um servidor onde estão armazenados todos os dados utilizados.

### Visualização da aplicação

**Desktop**

**Mobile**

### Links de acesso

Aplicação hospedada: https://igorg7.github.io/REST-Countries/index.html

Base de dados: https://api-rest-countries-tau.vercel.app/

## Processo de criação

Para o funcionamento dessa aplicação, um servidor simulado com JSON Server foi criado e hospedado para que a comunicação através de uma API fosse possível. Nesse servidor, existe um arquivo JSON contendo todos os dados necessários para alimentar a aplicação. A plataforma de hospedagem Vercel foi escolhida para manter no ar a base de dados que fornece essas informações.

![image](https://github.com/user-attachments/assets/f3bf3838-0b45-4cf9-89a0-c35b50d3ab1d)
<br/> (Dados do servidor simulado)

Com o servidor em funcionamento, agora é possível receber e manipular essas informações conforme o necessário. Para requisitar os dados para dentro da aplicação, uma função assíncrona que realiza essas chamadas foi construída. Essa função foi denominada como `requestData`.

![requestData](https://github.com/user-attachments/assets/6c6a8437-4b30-4470-afca-080e78a09ca0)

Através da URL, os dados são recebidos e armazenados de forma geral dentro de uma variável denominada `data`, essa variável recebe a resposta da requisição assim que ela for concluída por completo. Após a resolução da requisição, os dados recebidos estão prontos para serem utilizados.

Dentro da função `requestData`, uma outra função é chamada. Denominada `createCards`, tem como objetivo receber os dados vindos da API e manipulá-los, retornando na tela, Cards contendo todos os países e algumas informações básicas sobre eles. Para construir esses Cards, uma iteração dentro da variável recebida como parâmetro é realizada, e para cada item dentro dessa iteração, um objeto HTML é criado por meio do conceito Template Literals (Template Strings), e os dados necessários são inseridos no objeto.

![createCards](https://github.com/user-attachments/assets/0462c4d3-603f-4d4a-92ad-4e79cf993c5f)

Duas funções de evento estão contidas dentro da `createCards`, são elas: `redirectDetails` e `getCountryObject`. `redirectDetails` adiciona um `addEventListener` para cada Card criado, e então atribui um evento de clique a cada um deles. Ao acionar esse evento, o usuário será redirecionado para uma página onde irão ser exibidas informações detalhadas sobre o Card do país clicado. `getCountryObject` também adiciona um evento de clique a esses Cards, porém, sua execução busca o objeto correspondente ao Card clicado e o armazena no`sessionStorage` do navegador. `storeCountryObject` é a função responsável por buscar dentro da variável `data` o país correspondente ao clique do usuário, e armazenar o objeto contendo todas as informações referentes a ele na memoria local do navegador. Após a execução dessas duas funções, o redirecionamento acontece e os dados que são enviados ao `sessionStorage` são recuperados e retornados na página de detalhes do país clicado.

![funções de clique](https://github.com/user-attachments/assets/562868ec-c09a-426a-9ca1-2090304f902e)

Ainda na página inicial, temos as funções que realizam busca por pesquisa e filtro por regiões. Com um input de pesquisa disponível, um filtro baseado na entrada de dados por parte do usuário é realizado dentro da variável `data`. Essa pesquisa corresponde aos nomes dos países existentes, sendo aqueles que atenderem parcial ou completamente a pesquisa feita, e então serão retornados na tela. A função responsável por captar e retornar os Cards equivalentes à pesquisa é denominada como `eventInputSearch`. Após realizar o filtro corretamente, a função `createCards` é chamada recebendo essa nova coleção de países, e em seguida os recria para a visualização do usuário.

![inputSearch](https://github.com/user-attachments/assets/2afe17da-5a14-499f-80c1-2fb0114baa5c)

Já o filtro por regiões acontece por opções pré-definidas onde o usuário poderá escolher entre elas. Essas opções alternam entre os cinco continentes do globo. Ao clicar em alguma dessas alternativas de filtragem, a função `filterByRegion` irá realizar uma busca dentro da variável `data` e selecionar apenas os países que correspondem a região selecionada. Ao final da execução a função `createCards` também é chamada para recriar e exibir a nova coleção de países com base no filtro realizado.

![filterByRegion](https://github.com/user-attachments/assets/56988b70-0228-4658-82e3-c15538d1d479)

Partindo para a página de detalhes, uma variável denominada `recoveredCountry` recebe do `sessionStorage` o objeto com as informações referentes ao país clicado na tela inicial. Com as informações recebidas, elas são retornadas em seus campos específicos, trazendo novas informações sobre o país em questão.

![campos-pag-detalhes](https://github.com/user-attachments/assets/d34ff962-04dc-45d5-b186-8710dafb7666)

Em um determinado campo, são exibidos os países fronteiriços do país representado no momento. No objeto recebido do `sessionStorage`, contém uma propriedade chamada `borders`, que guarda dentro de um `array`, uma coleção com todos os países fronteiriços do país em questão. Porém, nesse `array`, os países são representados pelas suas siglas, e então uma função responsável por realizar uma busca na API utilizando essas siglas foi construída. A função em questão é denominada como`requestApi`, e em sua execução uma requisição é realizada, e a URL em questão recebe por parâmetro a sigla do país a ser buscado, e retorna o nome do mesmo.

![requestApi](https://github.com/user-attachments/assets/f9d8d793-1926-4612-b0b6-fdcfac1370e9)

Uma função denominada `getNameBorderCountries`, trabalha um `array` chamado `bordersCode` que contem essas siglas, e então realiza uma iteração que irá utilizar a função `requestApi` para encontrar o nome de cada país e retornar um novo `array` com o nome escrito de todos eles.

![getNameBorderCountries](https://github.com/user-attachments/assets/6fc23107-bbbb-41e5-9b7a-0b6c7bc85e0a)

Na função `renderCards`, são criados pequenos Cards que contem de fato o nome escrito dos países. Uma variável chamada `arrayNameCountries` recebe o retorno da função `getNameBorderCountries`, que vem com um novo `array` contendo os nomes desses países. A seguir, é realizada uma iteração no `array` `arrayNameCountries`, que irá criar um Card para cada item existente dentro de sua coleção.

![renderCards](https://github.com/user-attachments/assets/476179ad-2899-4e26-89a4-bdcfeec75eb8)

Ao final da execução, uma outra função chamada de `reloadNewCountry` é acionada. Nela, todos os Cards criados recebem um evento de clique, que ao ocorrer, captura o nome do país representado nesse Card e o utiliza para buscar da API o objeto que irá trazer todas as informações do país fronteiriço em questão. Após a busca, o objeto recebido é armazenado no `sessionStorage` e página é recarregada para exibir as novas informações do país fronteiriço clicado.

![reloadNewCountry](https://github.com/user-attachments/assets/c21ab739-5661-45cc-b060-b097154747a0)

Para realizar a busca do país clicado, uma função chamada `resquestNameCountryClicked` é utilizada. Essa função realiza uma requisição a API, que recebe na URL o nome do país a ser encontrado. Esse nome é passado por parâmetro na função, e caso seja encontrado, o objeto que trás as informações correspondentes a esse país é retornado.

![requestNameCountryClicked](https://github.com/user-attachments/assets/7ace4757-f0bc-45fa-b0de-f1bc70bc86f1)
