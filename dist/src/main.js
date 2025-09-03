"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cadastro_clientes_1 = require("./clientes/cadastro_clientes");
const cadastro_produtos_1 = require("./src/clientes/produtos/cadastro_produtos");
const registro_pedido_1 = require("./src/clientes/extras/pedidos/registro_pedido");
const relatorios_vendas_1 = require("./src/clientes/relatorios/relatorios_vendas");
const promo_oes_1 = require("./src/clientes/extras/promo\u00E7oes");
const readline_sync_1 = __importDefault(require("readline-sync"));
function menu() {
    while (true) {
        console.log('\n🍕 Sistema da Pizzaria');
        console.log('1. Menu de Clientes (Cadastrar/Consultar/Atualizar/Excluir)');
        console.log('2. Menu de Produtos (Cadastrar/Consultar/Atualizar/Excluir)');
        console.log('3. Menu de Pedidos (Registrar/Consultar/Atualizar)');
        console.log('4. Ver Relatorio de Vendas');
        console.log('5. Menu de Promocoes (Adicionar/Consultar/Atualizar/Excluir)');
        console.log('0. Sair');
        const opcao = readline_sync_1.default.question('Escolha uma opcao: ');
        if (opcao === '1') {
            (0, cadastro_clientes_1.menuCliente)();
        }
        else if (opcao === '2') {
            (0, cadastro_produtos_1.menuProduto)();
        }
        else if (opcao === '3') {
            (0, registro_pedido_1.menuPedido)();
        }
        else if (opcao === '4') {
            (0, relatorios_vendas_1.relatorioVendas)();
        }
        else if (opcao === '5') {
            (0, promo_oes_1.menuPromocoes)();
        }
        else if (opcao === '0') {
            console.log('👋 Encerrando o sistema.');
            break;
        }
        else {
            console.log('❌ Opção inválida.');
        }
    }
}
function testeRapido() {
    console.log('Teste rapido: O sistema esta funcionando!');
}
testeRapido();
menu();
