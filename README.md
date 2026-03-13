# KYC Verification

Sistema de verificação de identidade construído com Next.js e Tailwind CSS.

## Demo

[https://kyc-verification-omega.vercel.app](https://kyc-verification-omega.vercel.app)

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Fluxo de verificação do utilizador |
| `/dashboard` | Painel do analista ou admin |

## Fluxo do Utilizador

1. **Captura do documento** - upload do bilhete de identidade ou passaporte
2. **Verificação facial** - foto tirada pela câmera
3. **Processamento** - validação automática
4. **Resultado** - confirmação da submissão

A submissão fica com estado **pendente** até o analista tomar uma decisão.

## Painel do Analista

Acesso em `/dashboard`. O analista pode:

- Ver todas as verificações com ID, nome, data de submissão e estado
- Filtrar por estado: Todos, Pendentes, Aprovados, Rejeitados
- Aprovar ou rejeitar directamente na lista

## Correr localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Stack

- Next.js - App Router
- Tailwind CSS 
- Vercel - deploy