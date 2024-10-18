const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      produtos: [],
      produto: false,
      carrinho: [],
    };
  },
  computed: {
    carrinhoTotal() {
    let total = 0;
    if(this.carrinho.length) {
      this.carrinho.forEach(item => {
        total += item.preco;
      })
    }
    return total;  
    },
  },
  methods: {
    fetchProdutos() {
      fetch("api/produtos.json")
      .then(r => r.json())
      .then(r => {
        this.produtos = r;
      });
    },
    fetchProduto(id){
      fetch(`./api/produtos/${id}/dados.json`)
      .then(r => r.json())
      .then(r => {
        this.produto = r;
      });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    numeroPreco(preco) {
      return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    fecharModal(event) {
      if (event.target === event.currentTarget) {
        this.produto = false
      }
    },
    adicionarItem() {
      if(this.produto.estoque > 0) {
        this.produto.estoque--;
        const { id, nome, preco } = this.produto;
        this.carrinho.push({ id, nome, preco });
      }
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    }
  },
  created() {
    this.fetchProdutos();
  },
}).mount("#app");
