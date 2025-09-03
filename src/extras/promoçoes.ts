import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

const baseDir = __dirname;
const csvPath = path.join(baseDir, 'promocoes.csv');

export function listarPromocoes(): void {
    if (!fs.existsSync(csvPath) || fs.statSync(csvPath).size === 0) {
        console.log('Nenhuma promoção cadastrada.');
        return;
    }
    console.log('\n🎉 Promoções Atuais:');
    const linhas = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    linhas.forEach((linha, idx) => {
        console.log(`${idx + 1}. ${linha}`);
    });
}

export function formasPagamento(): void {
    console.log('💳 Formas de Pagamento:');
    console.log('- Dinheiro');
    console.log('- Cartão de Crédito/Débito');
    console.log('- Pix');
}

export function menuPromocoes(): void {
    function adicionarPromocao(): void {
        const descricao = readlineSync.question('Descrição da promoção: ');
        fs.appendFileSync(csvPath, descricao + '\n', 'utf-8');
        console.log('✅ Promoção adicionada!');
    }

    function consultarPromocoes(): void {
        if (!fs.existsSync(csvPath) || fs.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        console.log('\n🎉 Promoções Atuais:');
        const linhas = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        linhas.forEach((linha, idx) => {
            console.log(`${idx + 1}. ${linha}`);
        });
    }

    function atualizarPromocao(): void {
        if (!fs.existsSync(csvPath) || fs.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        const promocoes = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        consultarPromocoes();
        const num = readlineSync.question('Digite o número da promoção para atualizar: ');
        const idx = parseInt(num) - 1;
        if (isNaN(idx) || idx < 0 || idx >= promocoes.length) {
            console.log('❌ Número inválido.');
            return;
        }
        const novaDesc = readlineSync.question('Nova descrição: ');
        promocoes[idx] = novaDesc;
        fs.writeFileSync(csvPath, promocoes.join('\n') + '\n', 'utf-8');
        console.log('✅ Promoção atualizada!');
    }

    function excluirPromocao(): void {
        if (!fs.existsSync(csvPath) || fs.statSync(csvPath).size === 0) {
            console.log('Nenhuma promoção cadastrada.');
            return;
        }
        const promocoes = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
        consultarPromocoes();
        const num = readlineSync.question('Digite o número da promoção para excluir: ');
        const idx = parseInt(num) - 1;
        if (isNaN(idx) || idx < 0 || idx >= promocoes.length) {
            console.log('❌ Número inválido.');
            return;
        }
        promocoes.splice(idx, 1);
        fs.writeFileSync(csvPath, promocoes.join('\n') + '\n', 'utf-8');
        console.log('✅ Promoção excluída!');
    }

    while (true) {
        console.log('\n--- Menu de Promoções ---');
        console.log('1. Adicionar Promoção');
        console.log('2. Consultar Promoções');
        console.log('3. Atualizar Promoção');
        console.log('4. Excluir Promoção');
        console.log('0. Voltar');
        const escolha = readlineSync.question('Escolha uma opção: ');
        if (escolha === '1') {
            adicionarPromocao();
        } else if (escolha === '2') {
            consultarPromocoes();
        } else if (escolha === '3') {
            atualizarPromocao();
        } else if (escolha === '4') {
            excluirPromocao();
        } else if (escolha === '0') {
            break;
        } else {
            console.log('❌ Opção inválida.');
        }
    }
}
