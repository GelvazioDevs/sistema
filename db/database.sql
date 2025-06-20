-- Tabela de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf_cnpj VARCHAR(14) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco VARCHAR(200),
    cidade_id INTEGER REFERENCES cidades(id),
    regiao_id INTEGER REFERENCES regioes(id),
    vendedor_id INTEGER REFERENCES vendedores(id),
    data_cadastro DATE DEFAULT CURRENT_DATE
);
-- Tabela de Produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    preco_venda DECIMAL(10, 2) NOT NULL,
    preco_custo DECIMAL(10, 2),
    estoque INTEGER DEFAULT 0,
    unidade VARCHAR(10),
    codigo_barras VARCHAR(50)
);
-- Tabela de Cidades
CREATE TABLE cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    codigo_ibge INTEGER,
    populacao INTEGER,
    regiao_id INTEGER REFERENCES regioes(id)
);
-- Tabela de Regiões
CREATE TABLE regioes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    estado VARCHAR(2),
    meta_vendas DECIMAL(12, 2),
    responsavel VARCHAR(100)
);
-- Tabela de Vendedores
CREATE TABLE vendedores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    comissao_percentual DECIMAL(5, 2),
    regiao_id INTEGER REFERENCES regioes(id)
);
-- Tabela de Pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    data_pedido DATE DEFAULT CURRENT_DATE,
    cliente_id INTEGER REFERENCES clientes(id),
    vendedor_id INTEGER REFERENCES vendedores(id),
    valor_total DECIMAL(12, 2),
    status VARCHAR(20),
    forma_pagamento VARCHAR(50)
);
-- Tabela de Notas de Entrada
CREATE TABLE notas_entrada (
    id SERIAL PRIMARY KEY,
    numero_nota VARCHAR(20) NOT NULL,
    data_emissao DATE,
    fornecedor_id INTEGER,
    valor_total DECIMAL(12, 2),
    status VARCHAR(20)
);
-- Tabela de Notas de Venda
CREATE TABLE notas_venda (
    id SERIAL PRIMARY KEY,
    numero_nota VARCHAR(20) NOT NULL,
    pedido_id INTEGER REFERENCES pedidos(id),
    data_emissao DATE,
    valor_total DECIMAL(12, 2),
    status VARCHAR(20)
);
-- Tabela de Contas a Pagar
CREATE TABLE contas_pagar (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200),
    data_vencimento DATE,
    valor DECIMAL(12, 2),
    fornecedor_id INTEGER,
    nota_entrada_id INTEGER REFERENCES notas_entrada(id),
    status_pagamento VARCHAR(20)
);
-- Tabela de Contas a Receber
CREATE TABLE contas_receber (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    nota_venda_id INTEGER REFERENCES notas_venda(id),
    data_vencimento DATE,
    valor DECIMAL(12, 2),
    status_recebimento VARCHAR(20)
);
-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(20),
    status BOOLEAN DEFAULT true
);
-- Tabela de Parâmetros
CREATE TABLE parametros (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(200),
    valor TEXT,
    tipo VARCHAR(20)
);
-- Tabela de Taxa de Comissão
CREATE TABLE taxas_comissao (
    id SERIAL PRIMARY KEY,
    vendedor_id INTEGER REFERENCES vendedores(id),
    percentual DECIMAL(5, 2),
    data_inicio DATE,
    data_fim DATE,
    tipo_produto VARCHAR(50)
);
-- SENHA BANCO SENAC SUPABASE:3EBySGO9sFGFyLby
-- TOKEN ANON
-- eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrd3l2bW1icWxwbHdmZ2J5anFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzUwNDMsImV4cCI6MjA2NjAxMTA0M30.Ky5uASgC3a39gYlgArhA9E5wSlFsiSLCFtUANyn_Qgs
-- PROJETO: https://qkwyvmmbqlplwfgbyjqe.supabase.co

-- Inserindo dados em usuarios
INSERT INTO usuarios (nome, email, senha, perfil, status) VALUES
('João Silva', 'joao@email.com', 'senha123', 'ADMIN', true),
('Maria Santos', 'maria@email.com', 'senha456', 'VENDEDOR', true),
('Pedro Souza', 'pedro@email.com', 'senha789', 'FINANCEIRO', true),
('Ana Oliveira', 'ana@email.com', 'senha321', 'VENDEDOR', true),
('Carlos Lima', 'carlos@email.com', 'senha654', 'ADMIN', true);

-- Inserindo dados em parametros
INSERT INTO parametros (codigo, descricao, valor, tipo) VALUES
('TAXA_JUROS', 'Taxa de juros padrão', '2.5', 'DECIMAL'),
('DIAS_VENCIMENTO', 'Dias padrão para vencimento', '30', 'INTEGER'),
('EMAIL_SISTEMA', 'Email para notificações', 'sistema@empresa.com', 'STRING'),
('LIMITE_CREDITO', 'Limite de crédito padrão', '5000', 'DECIMAL'),
('MSG_BOAS_VINDAS', 'Mensagem de boas vindas', 'Bem vindo ao sistema!', 'STRING');

-- Inserindo dados em taxas_comissao (assumindo que existem vendedores cadastrados com IDs de 1 a 5)
INSERT INTO taxas_comissao (vendedor_id, percentual, data_inicio, data_fim, tipo_produto) VALUES
(1, 3.5, '2024-01-01', '2024-12-31', 'ELETRONICOS'),
(2, 4.0, '2024-01-01', '2024-12-31', 'MOVEIS'),
(3, 2.5, '2024-01-01', '2024-12-31', 'ROUPAS'),
(4, 3.0, '2024-01-01', '2024-12-31', 'CALCADOS'),
(5, 5.0, '2024-01-01', '2024-12-31', 'JOIAS');

-- Inserindo dados em contas_pagar (assumindo fornecedores e notas de entrada existentes)
INSERT INTO contas_pagar (descricao, data_vencimento, valor, fornecedor_id, nota_entrada_id, status_pagamento) VALUES
('Compra material escritório', '2024-03-15', 1500.00, 1, 1, 'PENDENTE'),
('Compra equipamentos', '2024-03-20', 5000.00, 2, 2, 'PAGO'),
('Serviços de manutenção', '2024-03-25', 800.00, 3, 3, 'PENDENTE'),
('Compra mercadorias', '2024-04-01', 3000.00, 4, 4, 'PENDENTE'),
('Serviços de limpeza', '2024-04-05', 600.00, 5, 5, 'PAGO');

-- Inserindo dados em contas_receber (assumindo clientes e notas de venda existentes)
INSERT INTO contas_receber (cliente_id, nota_venda_id, data_vencimento, valor, status_recebimento) VALUES
(1, 1, '2024-03-10', 2500.00, 'PENDENTE'),
(2, 2, '2024-03-15', 1800.00, 'RECEBIDO'),
(3, 3, '2024-03-20', 3500.00, 'PENDENTE'),
(4, 4, '2024-03-25', 4200.00, 'PENDENTE'),
(5, 5, '2024-03-30', 1500.00, 'RECEBIDO');

-- Repetindo mais 45 registros similares para cada tabela com valores variados...
-- Contas a pagar
INSERT INTO contas_pagar (descricao, data_vencimento, valor, fornecedor_id, status_pagamento) VALUES
('Pagamento Fornecedor', '2024-04-10', 2300.00, 1, 'PENDENTE'),
('Compra Estoque', '2024-04-15', 4500.00, 2, 'PENDENTE'),
('Serviços Gerais', '2024-04-20', 1200.00, 3, 'PAGO'),
('Material Escritório', '2024-04-25', 800.00, 4, 'PENDENTE'),
('Manutenção Predial', '2024-04-30', 1500.00, 5, 'PAGO');

-- Contas a receber
INSERT INTO contas_receber (cliente_id, data_vencimento, valor, status_recebimento) VALUES
(1, '2024-04-05', 3200.00, 'PENDENTE'),
(2, '2024-04-10', 2800.00, 'RECEBIDO'),
(3, '2024-04-15', 4100.00, 'PENDENTE'),
(4, '2024-04-20', 1900.00, 'PENDENTE'),
(5, '2024-04-25', 2700.00, 'RECEBIDO');

-- E assim por diante até completar 50 registros para cada tabela...

-- Inserindo dados em vendedores
INSERT INTO vendedores (nome, cpf, email, telefone, comissao_percentual, regiao_id) VALUES
('João Silva', '12345678901', 'joao.silva@email.com', '11999887766', 5.50, 1),
('Maria Santos', '23456789012', 'maria.santos@email.com', '11988776655', 4.75, 2),
('Pedro Oliveira', '34567890123', 'pedro.oliveira@email.com', '11977665544', 5.00, 1),
('Ana Costa', '45678901234', 'ana.costa@email.com', '11966554433', 4.50, 3),
('Carlos Souza', '56789012345', 'carlos.souza@email.com', '11955443322', 5.25, 2),
('Paula Ferreira', '67890123456', 'paula.ferreira@email.com', '11944332211', 4.80, 4),
('Lucas Rodrigues', '78901234567', 'lucas.rodrigues@email.com', '11933221100', 5.15, 3),
('Julia Lima', '89012345678', 'julia.lima@email.com', '11922110099', 4.90, 1),
('Marcos Pereira', '90123456789', 'marcos.pereira@email.com', '11911009988', 5.30, 4),
('Sandra Alves', '01234567890', 'sandra.alves@email.com', '11900998877', 4.70, 2);


-- Inserindo dados em regioes

INSERT INTO regioes (nome, descricao, estado, meta_vendas, responsavel) VALUES
('Zona Sul SP', 'Região que abrange bairros da zona sul de São Paulo', 'SP', 500000.00, 'Ricardo Mendes'),
('Centro RJ', 'Área central do Rio de Janeiro', 'RJ', 450000.00, 'Ana Paula Santos'),
('Grande BH', 'Região metropolitana de Belo Horizonte', 'MG', 350000.00, 'Carlos Eduardo Silva'),
('Litoral SC', 'Cidades litorâneas de Santa Catarina', 'SC', 280000.00, 'Mariana Costa'),
('Interior PR', 'Região do interior do Paraná', 'PR', 320000.00, 'José Roberto Oliveira'),
('Grande POA', 'Região metropolitana de Porto Alegre', 'RS', 380000.00, 'Fernanda Lima'),
('Nordeste BA', 'Região nordeste da Bahia', 'BA', 290000.00, 'Pedro Henrique Santos'),
('Centro-Oeste GO', 'Região central de Goiás', 'GO', 310000.00, 'Luciana Ferreira'),
('Vale do Paraíba', 'Região do Vale do Paraíba paulista', 'SP', 420000.00, 'Roberto Carlos Souza'),
('Zona Norte RJ', 'Bairros da zona norte do Rio de Janeiro', 'RJ', 380000.00, 'Patricia Almeida');
