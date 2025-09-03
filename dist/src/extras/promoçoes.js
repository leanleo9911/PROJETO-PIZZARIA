"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarPromocoes = listarPromocoes;
exports.formasPagamento = formasPagamento;
exports.menuPromocoes = menuPromocoes;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const baseDir = __dirname;
const csvPath = path_1.default.join(baseDir, 'promocoes.csv');
function listarPromocoes() {
    if (!fs_extra_1.default.existsSync(csvPath) || fs_extra_1.default.statSync(csvPath).size === 0) {
        console.log('Nenhuma promoção cadastrada.');
        return;
    }
    console.log('\n🎉 Promoções Atuais:');
    const linhas = fs_extra_1.default.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    linhas.forEach((linha, idx) => {
        console.log(`${idx + 1}. ${linha}`);
    });
}
function formasPagamento() {
    console.log('💳 Formas de Pagamento:');
    console.log('- Dinheiro');
    console.log('- Cartão de Crédito/Débito');
    console.log('- Pix');
}
function menuPromocoes() {
    function adicionarPromocao() {
        const descricao = readline_sync_1.default.question('Descrição da promoção: ');
        fs_extra_1.default.appendFileSync(csvPath, descricao + '\n', 'utf-8');
        console.log('✅ Promoção adicionada!');
    }
    function consultarPromocoes() {
        if (!fs_extra_1.default.existsSync(csvPath) || fs_extra_1.default.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        console.log('\n🎉 Promoções Atuais:');
        const linhas = fs_extra_1.default.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        linhas.forEach((linha, idx) => {
            console.log(`${idx + 1}. ${linha}`);
        });
    }
    function atualizarPromocao() {
        if (!fs_extra_1.default.existsSync(csvPath) || fs_extra_1.default.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        const promocoes = fs_extra_1.default.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        consultarPromocoes();
        const num = readline_sync_1.default.question('Digite o número da promoção para atualizar: ');
        const idx = parseInt(num) - 1;
        if (isNaN(idx) || idx < 0 || idx >= promocoes.length) {
            console.log('❌ Número inválido.');
            return;
        }
        const novaDesc = readline_sync_1.default.question('Nova descrição: ');
        promocoes[idx] = novaDesc;
        fs_extra_1.default.writeFileSync(csvPath, promocoes.join('\n') + '\n', 'utf-8');
        console.log('✅ Promoção atualizada!');
    }
    function excluirPromocao() {
        if (!fs_extra_1.default.existsSync(csvPath) || fs_extra_1.default.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        const promocoes = fs_extra_1.default.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        consultarPromocoes();
        const num = readline_sync_1.default.question('Digite o número da promoção para excluir: ');
        const idx = parseInt(num) - 1;
        if (isNaN(idx) || idx < 0 || idx >= promocoes.length) {
            console.log('❌ Número inválido.');
            return;
        }
        promocoes.splice(idx, 1);
        fs_extra_1.default.writeFileSync(csvPath, promocoes.join('\n') + '\n', 'utf-8');
        console.log('✅ Promoção excluída!');
    }
    while (true) {
        console.log('\n--- Menu de Promoções ---');
        console.log('1. Adicionar Promoção');
        console.log('2. Consultar Promoções');
        console.log('3. Atualizar Promoção');
        console.log('4. Excluir Promoção');
        console.log('0. Voltar');
        const escolha = readline_sync_1.default.question('Escolha uma opção: ');
        if (escolha === '1') {
            adicionarPromocao();
        }
        else if (escolha === '2') {
            consultarPromocoes();
        }
        else if (escolha === '3') {
            atualizarPromocao();
        }
        else if (escolha === '4') {
            excluirPromocao();
        }
        else if (escolha === '0') {
            break;
        }
        else {
            console.log('❌ Opção inválida.');
        }
    }
}
