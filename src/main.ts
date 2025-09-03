import { menuCliente } from './clientes/cadastro_clientes';
import { menuProduto } from './src/clientes/produtos/cadastro_produtos';
import { menuPedido } from './src/clientes/extras/pedidos/registro_pedido';
import { relatorioVendas } from './src/clientes/relatorios/relatorios_vendas';
import { menuPromocoes } from './src/clientes/extras/promoçoes';
import readlineSync from 'readline-sync';

function menu(): void {
    while (true) {
        console.log('\n🍕 Sistema da Pizzaria');
        console.log('1. Menu de Clientes (Cadastrar/Consultar/Atualizar/Excluir)');
        console.log('2. Menu de Produtos (Cadastrar/Consultar/Atualizar/Excluir)');
        console.log('3. Menu de Pedidos (Registrar/Consultar/Atualizar)');
        console.log('4. Ver Relatorio de Vendas');
        console.log('5. Menu de Promocoes (Adicionar/Consultar/Atualizar/Excluir)');
        console.log('0. Sair');

        const opcao = readlineSync.question('Escolha uma opcao: ');

        if (opcao === '1') {
            menuCliente();
        } else if (opcao === '2') {
            menuProduto();
        } else if (opcao === '3') {
            menuPedido();
        } else if (opcao === '4') {
            relatorioVendas();
        } else if (opcao === '5') {
            menuPromocoes();
        } else if (opcao === '0') {
            console.log('👋 Encerrando o sistema.');
            break;
        } else {
            console.log('❌ Opção inválida.');
        }
    }
}

function testeRapido(): void {
    console.log('Teste rapido: O sistema esta funcionando!');
}

testeRapido();
menu();