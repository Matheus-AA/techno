const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      produtos: [],
      produto: false
    };
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
    }
  },
  created() {
    this.fetchProdutos();
  },
}).mount("#app");
