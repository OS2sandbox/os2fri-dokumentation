#!/usr/bin/env node

interface EnvVars {
  ISSUE_NUMBER: string
  ISSUE_TITLE: string
  ISSUE_BODY: string
  ISSUE_LABELS: string
  ISSUE_CLOSED_AT: string
  OUTPUT_LOG?: string
}

function getEnv(): EnvVars {
  const missing: string[] = []
  const required = ['ISSUE_NUMBER', 'ISSUE_TITLE', 'ISSUE_BODY', 'ISSUE_LABELS', 'ISSUE_CLOSED_AT']
  for (const key of required) {
    if (!process.env[key]) missing.push(key)
  }
  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(', ')}`)
    process.exit(1)
  }
  return {
    ISSUE_NUMBER: process.env.ISSUE_NUMBER!,
    ISSUE_TITLE: process.env.ISSUE_TITLE!,
    ISSUE_BODY: process.env.ISSUE_BODY!,
    ISSUE_LABELS: process.env.ISSUE_LABELS!,
    ISSUE_CLOSED_AT: process.env.ISSUE_CLOSED_AT!,
    OUTPUT_LOG: process.env.OUTPUT_LOG || 'DECISION_LOG.md',
  }
}

function parseSection(body: string, heading: string): string {
  const regex = new RegExp(`## ${heading}\\s*\\n([\\s\\S]*?)(?=\\n## |$)`)
  const match = body.match(regex)
  return match ? match[1].trim() : ''
}

function extractLabels(labels: string): string[] {
  return labels
    .split(',')
    .map(l => l.trim())
    .filter(l => l.length > 0)
}

function formatDate(iso: string): string {
  return iso.slice(0, 10)
}

function buildEntry(vars: EnvVars): string {
  const context = parseSection(vars.ISSUE_BODY, 'Kontekst')
  const decision = parseSection(vars.ISSUE_BODY, 'Beslutning')
  const consequences = parseSection(vars.ISSUE_BODY, 'Konsekvenser')
  const labels = extractLabels(vars.ISSUE_LABELS).filter(l => l !== 'Beslutning')
  const date = formatDate(vars.ISSUE_CLOSED_AT)
  const category = labels.length > 0 ? labels.join(', ') : 'generel'
  const issueUrl = `https://github.com/OS2sandbox/os2fri-dokumentation/issues/${vars.ISSUE_NUMBER}`

  return `## BDR-#${vars.ISSUE_NUMBER}: ${vars.ISSUE_TITLE} (${date})
**Kategori:** ${category} | **Sag:** [#${vars.ISSUE_NUMBER}](${issueUrl})

### Kontekst
${context || '*Ingen kontekst angivet.*'}

### Beslutning
${decision || '*Ingen beslutning angivet.*'}

### Konsekvenser
${consequences || '*Ingen konsekvenser angivet.*'}
`
}

function prependEntry(content: string, entry: string): string {
  const headerMatch = content.match(/^# .+\n/)
  if (!headerMatch) {
    return `# Beslutningslog\n\n${entry}`
  }
  const header = headerMatch[0]
  const rest = content.slice(header.length)
  return header + '\n' + entry + rest.trimStart()
}

function isDuplicate(content: string, issueNumber: string): boolean {
  const regex = new RegExp(`^## BDR-#${issueNumber}:`, 'm')
  return regex.test(content)
}

async function main() {
  const vars = getEnv()
  const logPath = vars.OUTPUT_LOG!
  const fs = await import('fs')

  let content = ''
  try {
    content = fs.readFileSync(logPath, 'utf-8')
  } catch {
    content = '# Beslutningslog\n'
  }

  if (isDuplicate(content, vars.ISSUE_NUMBER)) {
    console.log(`BDR-#${vars.ISSUE_NUMBER} already exists in ${logPath} — skipping.`)
    return
  }

  const entry = buildEntry(vars)
  const updated = prependEntry(content, entry)
  fs.writeFileSync(logPath, updated, 'utf-8')
  console.log(`Added BDR-#${vars.ISSUE_NUMBER} to ${logPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
