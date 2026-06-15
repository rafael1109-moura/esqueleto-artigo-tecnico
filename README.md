# Heap, HeapSort e Lista de Prioridade

Aplicacao educacional em React + TypeScript, criada com Vite, para estudar estruturas de dados de forma interativa.

O projeto permite montar e validar um heap manualmente, acompanhar os passos do HeapSort e comparar dois modos de lista de prioridade: lista nao ordenada e lista ordenada.

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereco exibido pelo Vite.

## O que o projeto ensina

### Heap

Heap e uma arvore binaria completa em que cada pai respeita uma regra em relacao aos filhos.

- No `Min-Heap`, cada pai deve ser menor ou igual aos filhos.
- No `Max-Heap`, cada pai deve ser maior ou igual aos filhos.

Na aplicacao, voce monta a arvore arrastando ou clicando nos valores disponiveis. Depois, pode validar se a estrutura respeita a propriedade de heap.

### HeapSort

HeapSort e um algoritmo de ordenacao que usa a estrutura de heap. A demonstracao cria um `Max-Heap`, remove repetidamente o maior valor e move esse valor para a area ordenada ate que todos os itens fiquem em ordem crescente.

### Lista de Prioridade

Uma lista de prioridade armazena elementos com um valor e uma prioridade. A remocao sempre retira o item de maior prioridade.

A aplicacao compara dois modos:

- Lista de prioridade nao ordenada: a insercao coloca o item no final da lista. A remocao precisa percorrer a lista para encontrar a maior prioridade.
- Lista de prioridade ordenada: a insercao mantem a lista organizada por prioridade. A remocao e direta, pois o item de maior prioridade fica no inicio.

A lista ordenada mostra os valores em ordem crescente, facilita buscas, mas nao possui estrutura em arvore como o heap. A diferenca principal e que listas organizam elementos em sequencia, enquanto o heap organiza elementos como uma arvore binaria completa e favorece o acesso eficiente ao menor ou maior valor.

## Como usar

### Heap manual

1. Clique em um valor disponivel e depois clique em um no da arvore.
2. Ou arraste um valor diretamente para um no.
3. Clique com o botao direito em um no preenchido para limpa-lo.
4. Escolha `Min-Heap` ou `Max-Heap`.
5. Clique em `Validar heap`.

### HeapSort

Use os botoes `Anterior` e `Proximo` para navegar pelos passos do algoritmo.

### Lista de Prioridade

1. Informe um valor.
2. Informe uma prioridade numerica.
3. Escolha entre `Nao ordenada` e `Ordenada`.
4. Clique em `Inserir`.
5. Clique em `Remover maior prioridade` para retirar o item com maior prioridade.

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

- `src/pages/Home.tsx`: compoe a pagina principal e conecta as secoes de heap, HeapSort e lista de prioridade.
- `src/hooks/useHeap.ts`: concentra o estado e as acoes do exercicio de heap.
- `src/components/Controls.tsx`: exibe os controles do heap, do HeapSort e da lista ordenada dos valores do exercicio.
- `src/components/HeapTree.tsx`: renderiza a arvore binaria completa.
- `src/components/PriorityQueue/PriorityQueue.tsx`: interface da lista de prioridade, com formulario, troca de modo e remocao por prioridade.
- `src/utils/priorityQueueUtils.js`: funcoes puras para inserir, ordenar e remover itens da lista de prioridade.
- `src/utils/heapSort.ts`: gera a sequencia de passos do HeapSort.
- `src/utils/validation.ts`: valida a propriedade de heap.

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: compila o TypeScript e gera o build de producao.
- `npm run lint`: executa o ESLint.
- `npm run preview`: visualiza o build gerado.
