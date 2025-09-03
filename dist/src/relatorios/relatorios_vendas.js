"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatorioVendas = relatorioVendas;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
function relatorioVendas() {
    const baseDir = __dirname;
    const vendasPath = path_1.default.resolve(baseDir, '..', 'pedidos', 'vendas.csv');
    console.log('\n--- Relatório de Vendas ---');
    console.log('1. Consultar vendas por dia');
    console.log('2. Consultar vendas por mês');
    console.log('0. Voltar');
    const escolha = readline_sync_1.default.question('Escolha uma opção: ');
    if (escolha === '1') {
        // Consulta vendas por dia
        let dia = readline_sync_1.default.question('Digite a data (AAAA-MM-DD) ou ENTER para hoje: ').trim();
        if (!dia) {
            const hoje = new Date();
            dia = hoje.toISOString().slice(0, 10);
        }
        let vendasDia = 0;
        if (fs_extra_1.default.existsSync(vendasPath)) {
            const linhas = fs_extra_1.default.readFileSync(vendasPath, 'utf-8').split('\n').filter(l => l.trim());
            for (const linha of linhas.slice(1)) { // Ignora cabeçalho
                const row = linha.split(',');
                if (row.length < 6)
                    continue;
                const [data, , , qtd] = row;
                if (data.startsWith(dia)) {
                    vendasDia += parseInt(qtd);
                }
            }
        }
        console.log(`📅 Pizzas vendidas em ${dia}: ${vendasDia}`);
    }
    else if (escolha === '2') {
        // Consulta vendas por mês
        let mes = readline_sync_1.default.question('Digite o mês (AAAA-MM) ou ENTER para o mês atual: ').trim();
        if (!mes) {
            const hoje = new Date();
            mes = hoje.toISOString().slice(0, 7);
        }
        let vendasMes = 0;
        if (fs_extra_1.default.existsSync(vendasPath)) {
            const linhas = fs_extra_1.default.readFileSync(vendasPath, 'utf-8').split('\n').filter(l => l.trim());
            for (const linha of linhas.slice(1)) { // Ignora cabeçalho
                const row = linha.split(',');
                if (row.length < 6)
                    continue;
                const [data, , , qtd] = row;
                if (data.startsWith(mes)) {
                    vendasMes += parseInt(qtd);
                }
            }
        }
        console.log(`🗓️ Pizzas vendidas no mês ${mes}: ${vendasMes}`);
    }
    else if (escolha === '0') {
        return;
    }
    else {
        console.log('❌ Opção inválida.');
    }
}
