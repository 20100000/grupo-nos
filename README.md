<h1>Teste agenda telefônica- Grupo Nos</h1>

<h3>Tecnologias usadas no projeto</h3>
Ambiente docker com framework docker-compose<br/>
Back-end NodeJs com framework Express.<br/>
npm gerenciador de pacotes </br>
MySql banco de dados </br>
Fetch para Curl 
<br/>

<h3>Requisitos para rodar projeto</h3>
Docker é extremamente necessário porque KEY do HgBrasil Weather
 esta declarada como variável de ambiente no dockerfile <strong>ENV KEY_WEATHER</strong>.<br/>
 Instale nodejs e npm para instalar dependencias e rodar os testes.

<h3>Passo a passo para iniciar projeto 
<h4>1° Clone o projeto</h4> 
<pre>
git clone https://github.com/20100000/grupo-nos.git<br/>
cd grupo-nos
</pre>
<h4>2° Instale as dependências</h4>  
na raiz do projeto
crie node_module com as dependências.<br/>
<pre>
npm install
</pre>
<h4>3° Iniciar projeto</h4>
start back-end com docker-compose <br/>
<pre>
docker-compose up<br/>
</pre>
