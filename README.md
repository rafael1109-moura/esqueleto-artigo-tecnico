# Heap, HeapSort e Lista de Prioridade

Aplicacao educacional em React + TypeScript para estudar estruturas de dados de forma visual e interativa.

O projeto permite montar e validar um heap manualmente, acompanhar o HeapSort passo a passo e comparar dois modos de lista de prioridade: lista nao ordenada e lista ordenada.

## Como rodar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereco exibido pelo Vite.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- CSS modularizado em folha global do projeto
- ESLint

## Estruturas estudadas

### Heap

Heap e uma arvore binaria completa em que cada pai respeita uma regra em relacao aos filhos.

- No `Min-Heap`, cada pai deve ser menor ou igual aos filhos.
- No `Max-Heap`, cada pai deve ser maior ou igual aos filhos.

Na interface, o usuario monta a arvore manualmente, escolhe o tipo de heap e valida se cada relacao pai-filho esta correta.

### HeapSort

HeapSort e um algoritmo de ordenacao baseado em heap. A demonstracao cria um `Max-Heap`, extrai repetidamente o maior valor e move esse valor para a parte ordenada ate a lista ficar em ordem crescente.

A tela separa visualmente o trecho que ainda funciona como heap e o trecho que ja esta ordenado.

### Lista de Prioridade

Uma lista de prioridade armazena itens com valor e prioridade. A remocao sempre retira o item de maior prioridade.

Modos implementados:

- Lista de prioridade nao ordenada: insere no final e, ao remover, percorre a lista para encontrar a maior prioridade.
- Lista de prioridade ordenada: reorganiza os itens por prioridade na insercao e remove diretamente do inicio.

A lista ordenada facilita buscas e leitura sequencial, mas nao possui estrutura em arvore como o heap. O heap organiza os elementos como uma arvore binaria completa e favorece o acesso ao item mais importante pela raiz.

## Melhorias visuais implementadas

- Hierarquia visual mais clara entre titulo principal, secoes e paineis.
- Cores com melhor contraste e estados mais consistentes.
- Espacamentos, bordas e alinhamentos padronizados.
- Textos didaticos adicionados nas secoes de pratica.
- Lista de prioridade com destaque para o item de maior prioridade.
- Itens de prioridade alta diferenciados visualmente dos itens comuns.
- Resumo visual das operacoes de insercao e remocao em cada modo.
- Exemplos iniciais mais proximos do cotidiano: tarefas, prova, e-mail e revisao de codigo.

## Como usar

### Heap manual

1. Clique em um valor disponivel e depois clique em um no da arvore.
2. Ou arraste um valor diretamente para um no.
3. Clique com o botao direito em um no preenchido para limpa-lo.
4. Escolha `Min-Heap` ou `Max-Heap`.
5. Clique em `Validar heap`.

### HeapSort

Use `Anterior` e `Proximo` para navegar pelos passos do algoritmo.

### Lista de Prioridade

1. Informe um valor.
2. Informe uma prioridade numerica maior ou igual a zero.
3. Escolha `Nao ordenada` ou `Ordenada`.
4. Clique em `Inserir`.
5. Clique em `Remover maior prioridade`.

## Estrutura do projeto

```text
src/
  App.tsx
  main.tsx
  types.ts
  components/
    Controls.tsx
    Feedback.tsx
    HeapTree.tsx
    Node.tsx
    PriorityQueue/
      PriorityQueue.tsx
      index.ts
  hooks/
    useHeap.ts
  pages/
    Home.tsx
  styles/
    main.css
  utils/
    heapSort.ts
    heapUtils.ts
    priorityQueueUtils.js
    priorityQueueUtils.d.ts
    validation.ts
```

## Modulos principais

- `src/pages/Home.tsx`: compoe a pagina principal.
- `src/hooks/useHeap.ts`: concentra o estado e as acoes do exercicio de heap.
- `src/components/Controls.tsx`: exibe controles do heap, HeapSort e lista ordenada dos valores.
- `src/components/HeapTree.tsx`: renderiza a arvore binaria completa.
- `src/components/PriorityQueue/PriorityQueue.tsx`: interface da lista de prioridade.
- `src/utils/priorityQueueUtils.js`: funcoes puras para inserir, ordenar, normalizar e remover itens da lista de prioridade.
- `src/utils/heapSort.ts`: gera os passos do HeapSort.
- `src/utils/validation.ts`: valida a propriedade de heap.

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: compila o TypeScript e gera o build de producao.
- `npm run lint`: executa o ESLint.
- `npm run preview`: visualiza o build gerado.
