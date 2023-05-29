- Inicialmente queria informar que não tive tempo de terminar todas as funcionalidades que gostaria. Poies estou trabalhando +8 horas por dia e de noite tenho a facul. Até pedi um tempo pra aumentar o prazo mas mesmo assim consegui só tocar no final de semana.

- Implementei todas as tecnologias que pediram, e adicionei o typeorm.

---

O sistema foi pensado para usuário visualizar informações da software ao entrar, ter a opção de registrar e logar.
Após logado poder escolher alguma sala e fazer suas propostas e interagir na sala.

---

Aqui estão algumas anotações que eu tinha anotado, mas não deu tempo de terminar:

- criar tela Home inicial de quando não logado
- implementar os testes
- Mensagens duplicando no chat
- Seria melhor colocar imagens nos cards dos leilões
- Quando inserir uma auction, ja definir a endDate 10 minutos depois da startDate
- Colocar um contador dentro de cada sala
- Ao dar refresh na página colocar uma imagem de reload para melhorar a experiencia do usuario
- Registrar o usuário com imagem para ser usada no lugar das iniciais na navbar
- Ao lado da mensagem enviada também mostrar o usuário que enviou
- colocar um quadro com o registro dos lances
- salvar no banco o historico de mensagens e de lances para controle e para mostrar para os novos usuários que entrarem na sala
- melhorar o layout com certeza
- ao entrar na sala, trazer mais informações para montar a tela inicial melhor
- separar os leilões em não iniciados, abertos e finalizados.
- ao encerrar uma auction mudar o estado dela e consequentemente remover ela da listagem de 'leilões abertos' e colocar nos finalizados.
- um usuário pode logar/acessar de lugares diferentes ao mesmo tempo, não sei se isso é recomendado
- a listagem de usuários ta meio zoada tbm, ta mostrando mais de um vez
- daria pra componentizar melhor o react
- converter dados do banco pra tela
- colocar mais informações do produto e do leilão dentro do leilão no grid a esquerda

Para testar:

- deve ser descompactado o projeto, assim como levantar um servidor com mysql, eu usei o Xampp.
- modificar as variáveis do .env da api
- rodar npm install no diretório raiz api
- rodar npm run start:dev no diretório raiz api
- criar os products, e as auctions (irão aparecer na página principal ao logar) via api
- repositório no postman que usei para testar a api:
  --- https://www.postman.com/research-operator-76750243/workspace/licitar/collection/15950486-6d3c5ccd-74fe-44c9-aa4f-11d1d473c81e
- é possivel criar usuários e testar o login pelo postman tbm, mas isso a aplicação faz
- é possivel fazer alguns testes no websocket criado
- rodar npm install no diretório raiz app
- rodar npm run start no diretório raiz app
- realizar o cadastros, efetuar o login entrar em uma sala de leilão e trocar mensagens
