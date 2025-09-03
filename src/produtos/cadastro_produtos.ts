import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

const baseDir = __dirname;
const csvPath = path.join(baseDir, 'produtos.csv');
const fieldnames = ['id', 'tipo', 'sabor', 'preco'];

function validarId(id: string): boolean {
    return /^\d{3}$/.test(id);
}
function validarTipo(tipo: string): boolean {
    const tiposValidos = [
        "Pizza Tradicional", "Pizza Especial", "Bebida", "Porções", "Sobremesa", "Outro"
    ];
    return tiposValidos.includes(tipo);
}
function validarSabor(sabor: string): boolean {
    return /^[\w\s]+( P| M| G)?$/.test(sabor);
}
function validarPreco(preco: string): boolean {
    const valor = parseFloat(preco.replace(',', '.'));
    return !isNaN(valor) && valor > 0;
}

function lerProdutos(): any[] {
    if (!fs.existsSync(csvPath)) return [];
    const linhas = fs.readFileSync(csvPath, 'utf-8').split('\n').filter(l => l.trim());
    if (linhas.length < 2) return [];
    const cabecalho = linhas[0].split(',');
    return linhas.slice(1).map(l => {
        const campos = l.split(',');
        const produto: { [key: string]: string } = {};
        cabecalho.forEach((k, i) => produto[k] = campos[i]);
        return produto;
    });
}

function salvarProdutos(produtos: any[]): void {
    let conteudo = fieldnames.join(',') + '\n';
    produtos.forEach(p => {
        conteudo += fieldnames.map(f => p[f]).join(',') + '\n';
    });
    fs.writeFileSync(csvPath, conteudo, 'utf-8');
}

export function cadastrarProduto(): void {
    const produtos = lerProdutos();
    const idsExistentes = new Set(produtos.map(p => p.id));

    let id_produto: string;
    while (true) {
        id_produto = readlineSync.question('Digite a ID do produto (Ex: 001): ');
        if (!validarId(id_produto)) {
            console.log('❌ ID inválido. Use 3 números, exemplo: 001');
            continue;
        }
        if (idsExistentes.has(id_produto)) {
            console.log('❌ Esta ID já está cadastrada. Escolha outra.');
            continue;
        }
        break;
    }

    let tipo: string;
    while (true) {
        tipo = readlineSync.question('Digite o Tipo (Pizza Tradicional, Pizza Especial, Bebida, Porções, Sobremesa, Outro): ');
        if (validarTipo(tipo)) break;
        console.log('❌ Tipo inválido. Escolha uma das opções: Pizza Tradicional, Pizza Especial, Bebida, Porções, Sobremesa, Outro');
    }

    let sabor: string;
    while (true) {
        sabor = readlineSync.question('Digite o Sabor/Nome e Tamanho (P/M/G ou único): ');
        if (validarSabor(sabor)) break;
        console.log('❌ Sabor inválido. Use apenas letras, números, espaços e, se quiser, termine com P, M ou G.');
    }

    let preco: string;
    while (true) {
        preco = readlineSync.question('Digite o Preço: R$');
        if (validarPreco(preco)) {
            preco = preco.replace(',', '.');
            break;
        }
        console.log('❌ Preço inválido. Use apenas números positivos. Exemplo: 35.00');
    }

    const produto = {
        id: id_produto,
        tipo,
        sabor,
        preco
    };

    produtos.push(produto);
    salvarProdutos(produtos);
    console.log('✅ Produto cadastrado com sucesso!');
}

function excluirProduto(): void {
    const produtos = lerProdutos();
    if (produtos.length === 0) {
        console.log('Nenhum produto cadastrado.');
        return;
    }
    console.log('Produtos cadastrados:');
    produtos.forEach(p => {
        console.log(`ID: ${p.id} | Tipo: ${p.tipo} | Sabor: ${p.sabor}`);
    });
    const idExcluir = readlineSync.question('Digite o ID do produto que deseja excluir: ');
    const novosProdutos = produtos.filter(p => p.id !== idExcluir);
    if (novosProdutos.length === produtos.length) {
        console.log('❌ Produto não encontrado.');
        return;
    }
    novosProdutos.forEach((p, idx) => p.id = String(idx + 1).padStart(3, '0'));
    salvarProdutos(novosProdutos);
    console.log('✅ Produto excluído e IDs renumeradas com sucesso!');
}

function consultarOuAtualizarProduto(): void {
    const produtos = lerProdutos();
    if (produtos.length === 0) {
        console.log('Nenhum produto cadastrado.');
        return;
    }
    console.log('\n--- Lista de Produtos ---');
    produtos.forEach(p => {
        console.log(`ID: ${p.id} | Tipo: ${p.tipo} | Sabor: ${p.sabor} | Preço: R$${p.preco}`);
    });
    const idEscolhido = readlineSync.question('\nDigite o ID do produto para ver detalhes ou ENTER para voltar: ').trim();
    if (!idEscolhido) return;
    const produto = produtos.find(p => p.id === idEscolhido);
    if (!produto) {
        console.log('❌ Produto não encontrado.');
        return;
    }
    console.log('\n--- Dados do Produto ---');
    Object.entries(produto).forEach(([campo, valor]) => {
        console.log(`${campo.charAt(0).toUpperCase() + campo.slice(1)}: ${valor}`);
    });
    if (readlineSync.question('\nDeseja atualizar este produto? (s/n): ').trim().toLowerCase() === 's') {
        console.log('Deixe em branco para manter o valor atual.');
        fieldnames.forEach(campo => {
            if (campo === 'id') return;
            const novoValor = readlineSync.question(`${campo.charAt(0).toUpperCase() + campo.slice(1)} atual (${produto[campo]}): `);
            if (novoValor.trim()) produto[campo] = novoValor;
        });
        salvarProdutos(produtos);
        console.log('✅ Produto atualizado com sucesso!');
    }
}

function gerenciarProduto(): void {
    const produtos = lerProdutos();
    if (produtos.length === 0) {
        console.log('Nenhum produto cadastrado.');
        return;
    }
    console.log('\n--- Lista de Produtos ---');
    produtos.forEach(p => {
        console.log(`ID: ${p.id} | Tipo: ${p.tipo} | Sabor: ${p.sabor} | Preço: R$${p.preco}`);
    });
    const acao = readlineSync.question("\nDigite o ID para consultar/atualizar, 'E' para excluir ou ENTER para voltar: ").trim();
    if (!acao) return;
    if (acao.toLowerCase() === 'e') {
        const idExcluir = readlineSync.question('Digite o ID do produto que deseja excluir: ').trim();
        const novosProdutos = produtos.filter(p => p.id !== idExcluir);
        if (novosProdutos.length === produtos.length) {
            console.log('❌ Produto não encontrado.');
            return;
        }
        novosProdutos.forEach((p, idx) => p.id = String(idx + 1).padStart(3, '0'));
        salvarProdutos(novosProdutos);
        console.log('✅ Produto excluído e IDs renumeradas com sucesso!');
        return;
    }
    const produto = produtos.find(p => p.id === acao);
    if (!produto) {
        console.log('❌ Produto não encontrado.');
        return;
    }
    console.log('\n--- Dados do Produto ---');
    Object.entries(produto).forEach(([campo, valor]) => {
        console.log(`${campo.charAt(0).toUpperCase() + campo.slice(1)}: ${valor}`);
    });
    if (readlineSync.question('\nDeseja atualizar este produto? (s/n): ').trim().toLowerCase() === 's') {
        console.log('Deixe em branco para manter o valor atual.');
        fieldnames.forEach(campo => {
            if (campo === 'id') return;
            const novoValor = readlineSync.question(`${campo.charAt(0).toUpperCase() + campo.slice(1)} atual (${produto[campo]}): `);
            if (novoValor.trim()) produto[campo] = novoValor;
        });
        salvarProdutos(produtos);
        console.log('✅ Produto atualizado com sucesso!');
    }
}

export function menuProduto(): void {
    while (true) {
        console.log('\n--- Menu de Produtos ---');
        console.log('1. Cadastrar Produto');
        console.log('2. Gerenciar Produto (Consultar/Atualizar/Excluir)');
        console.log('0. Voltar');
        const escolha = readlineSync.question('Escolha uma opção: ');
        if (escolha === '1') {
            cadastrarProduto();
        } else if (escolha === '2') {
            gerenciarProduto();
        } else if (escolha === '0') {
            break;
        } else {
            console.log('❌ Opção inválida.');
        }
    }
}