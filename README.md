# **Uzzi Energy Frontend**

## **Instalação**

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

1. Clone este repositório:

   ```
   git clone ssh://git@github.com:Jwfelipee/web_territory_manager.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd web_territory_manager
   ```

3. Instale as dependências do projeto:

   ```
   npm ci
   ```

## **Uso**

### **Desenvolvimento**

Para executar o projeto em ambiente de desenvolvimento, utilize o seguinte comando:

```
npm run dev
```

Isso iniciará o servidor de desenvolvimento e o projeto estará disponível em **[http://localhost:5173](http://localhost:5173/)**.

### **Construção**

Para criar uma versão otimizada para produção do projeto, execute o seguinte comando:

```
npm run build
```

Os arquivos otimizados serão gerados no diretório **`dist`**.

### **Lint**

Para executar a verificação de lint no código, utilize o seguinte comando:

```
npm run lint
```

Para corrigir automaticamente os problemas de lint, execute o seguinte comando:

```
npm run lint:fix
```

### **Storybook**

Para visualizar os componentes no Storybook, utilize os seguintes comandos:

```
npm run storybook
```

Isso iniciará o servidor do Storybook e você poderá acessá-lo em **[http://localhost:6006](http://localhost:6006/)**.

Para criar uma versão otimizada do Storybook para produção, execute o seguinte comando:

```
npm run build-storybook
```

Os arquivos otimizados serão gerados no diretório **`storybook-static`**.

## **Dependências**

- clsx: ^1.2.1
- react: ^18.2.0
- react-dom: ^18.2.0
- react-error-boundary: ^4.0.10
- react-helmet-async: ^1.3.0
- react-router-dom: ^6.14.1

## **Desenvolvimento**

### **Dependências de Desenvolvimento**

- @storybook/addon-essentials: ^7.0.27
- @storybook/addon-interactions: ^7.0.27
- @storybook/addon-links: ^7.0.27
- @storybook/addon-styling: ^1.3.3
- @storybook/blocks: ^7.0.27
- @storybook/react: ^7.0.27
- @storybook/react-vite: ^7.0.27
- @storybook/testing-library: ^0.0.14-next.2
- @types/node: ^20.4.2
- @types/react: ^18.2.14
- @types/react-dom: ^18.2.6
- @typescript-eslint/eslint-plugin: ^5.61.0
- @typescript-eslint/parser: ^5.61.0
- @vitejs/plugin-react: ^4.0.1
- autoprefixer: ^10.4.14
- eslint: ^8.44.0
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.1
- eslint-plugin-storybook: ^0.6.12
- git-commit-msg-linter: ^5.0.4
- husky: ^8.0.0
- lint-staged: ^13.2.3
- postcss: ^8.4.25
- prop-types: ^15.8.1
- rollup-plugin-visualizer: ^5.9.2
- storybook: ^7.0.27
- tailwindcss: ^3.3.3
- typescript: ^5.0.2
- vite: ^4.4.0
- vite-tsconfig-paths: ^4.2.0

## **Convenções de Commit**

Este projeto segue as convenções de commit para manter um histórico de commits organizado e legível. Recomendamos o uso do Commitlint para garantir a aderência a essas convenções.

As convenções de commit seguidas neste projeto são baseadas no formato do **[Conventional Commits](https://www.conventionalcommits.org/)**. Isso significa que cada mensagem de commit deve seguir o seguinte formato:

```
<tipo>(<escopo opcional>): <descrição>

[Corpo opcional]

[Rodapé opcional]
```

Exemplos de tipos de commit incluem:

- **`feat`**: para uma nova funcionalidade
- **`fix`**: para correção de bugs
- **`docs`**: para alterações na documentação
- **`chore`**: para tarefas de manutenção
- **`refactor`**: para refatorações de código
- **`test`**: para adição ou modificação de testes

Certifique-se de aderir a essas convenções ao fazer commits neste projeto. Isso ajudará a manter o histórico de commits limpo e facilitará a compreensão das alterações realizadas.

## **Contribuição**

1. Crie uma nova _branch_ para realizar suas modificações (**`git checkout -b feature/nome-da-feature`**)
2. Realize as modificações desejadas no código
3. Faça o _commit_ das suas alterações (**`git commit -am 'Adiciona nova feature'`**)
4. Faça o _push_ para a sua _branch_ (**`git push origin feature/nome-da-feature`**)
5. Abra um _pull request_ descrevendo as modificações propostas
