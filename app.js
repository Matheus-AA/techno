const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      produtos: [],
      produto: false,
      carrinho: [],
      carrinhoAtivo: false,
      mensagemAlerta: "Item adicionado",
      alertaAtivo: false,
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
    clickForaCarrinho(event) {
      if (event.target === event.currentTarget) {
        this.carrinhoAtivo = false
      }
    },
    adicionarItem() {
      if(this.produto.estoque > 0) {
        this.produto.estoque--;
        const { id, nome, preco } = this.produto;
        this.carrinho.push({ id, nome, preco });
        this.alerta(`${nome} adicionado ao carrinho.`);
      }
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if(window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho)
      }
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true
      setTimeout(() => {
        this.alertaAtivo = false
      },1900)
    },
    router() {
      const hash = document.location.hash
      if(hash) {
        this.fetchProduto(hash.replace("#", ""))
      }
    },
  },
  watch: {
    produto: {
      handler() {
        document.title = this.produto.nome || "Techno";
        const hash = this.produto.id || "";
        history.pushState(null, null, `#${hash}`);
      },
      deep: true,
    },
    carrinho: {
      handler() {
        window.localStorage.carrinho = JSON.stringify(this.carrinho);
      },
      deep: true,
    },
  },
  created() {
    this.fetchProdutos();
    this.router();
    this.checarLocalStorage();
  },
}).mount("#app");
