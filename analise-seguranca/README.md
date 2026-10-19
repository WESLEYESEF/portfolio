# 🔍 Análise de Segurança de Aplicativo Android

Estudo de engenharia reversa (educacional) de um aplicativo Android de teste, com foco em mapear o fluxo de verificação de assinatura/licença.

## Objetivo

Compreender como aplicativos Android implementam a verificação de status "premium" — do ponto de vista de **segurança defensiva** (entender o que pode ser explorado para depois proteger melhor sistemas próprios).

## Metodologia

### 1. Extração do APK
O aplicativo (de teste) foi extraído do dispositivo via ADB:

```bash
adb shell pm path com.exemplo.teste
adb pull /data/app/.../base.apk
```

### 2. Decompilação (análise estática)
O APK foi decompilado com o **jadx**, convertendo o bytecode Dalvik (.dex) de volta para código Java/Kotlin legível:

```bash
jadx -d decompiled base.apk
```

Resultado: mais de 16.000 classes decompiladas.

### 3. Localização da lógica de verificação
Através da estrutura de diretórios decompilada, foram identificados os pacotes relevantes:

```
com.exemplo.teste/
├── billing/          # Lógica de cobrança (Google Play Billing)
├── ui/premium/       # Telas de assinatura premium
├── data/repository/  # Repositórios (SubscriptionRepository)
└── utils/            # Utilitários (AppUtils, SharedPreferenceHelper)
```

## Resultado da Análise

### Função de verificação de status premium

**Arquivo:** `com/exemplo/teste/utils/AppUtils.java`

```java
public final boolean y(Context context) {
    return TextUtils.isEmpty(SharedPreferenceHelper.t(context));
}
```

### Fluxo de verificação

| Função | Papel |
|---|---|
| `AppUtils.y(Context)` | Verifica se é premium (retorna `false` = premium) |
| `SharedPreferenceHelper.t(Context)` | Lê o SID (Session ID) salvo |
| `SubscriptionRepository.v()` | `setPremiumUser()` — salva o SID após ativação |

### Lógica descoberta

- O status "premium" é determinado pelo **SID** (Session ID)
- `sid` vazio/nulo → usuário **FREE** (`y()` retorna `true`)
- `sid` com valor → usuário **PREMIUM** (`y()` retorna `false`)

### Onde o SID é armazenado

**Arquivo:** `com/exemplo/teste/utils/SharedPreferenceHelper.java`

| Chave | Tipo | Significado |
|---|---|---|
| `sid` | String | Session ID do premium (chave principal) |
| `is_trial_purchased` | Boolean | Se o trial foi comprado |
| `premium_ad_count` | Int | Contador de anúncios |

## Conclusão

A verificação de status premium **depende do servidor** (o SID é validado remotamente a cada chamada premium). Isso demonstra que a simples modificação local (SharedPreferences) não é suficiente para burlar a assinatura — o backend valida a sessão.

Esse tipo de análise é útil para **segurança defensiva**: entender como apps implementam verificação de licença ajuda a identificar vulnerabilidades semelhantes em sistemas próprios.

## Ferramentas utilizadas

- **jadx** — decompilador DEX → Java
- **ADB** — extração do APK
- **KernelSU** — acesso root para extração

---

> ⚠️ **Aviso:** Este estudo é para fins educacionais e de pesquisa de segurança, realizado em um aplicativo de teste próprio. A técnica deve ser aplicada apenas em aplicativos dos quais você tem autorização para analisar.
