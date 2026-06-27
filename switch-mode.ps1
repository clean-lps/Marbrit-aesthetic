# switch-mode.ps1 — Cambiar entre modo cloud y local
# Uso: .\switch-mode.ps1 cloud | .\switch-mode.ps1 local

param(
  [Parameter(Mandatory)]
  [ValidateSet("cloud", "local")]
  [string]$Mode
)

function Switch-AgentsMd {
  if ($Mode -eq "cloud") {
    Rename-Item -Path "AGENTS.md" -NewName "AGENTS-CLOUD.md" -Force -ErrorAction SilentlyContinue
    Rename-Item -Path "AGENTS-LOCAL.md" -NewName "AGENTS.md" -Force -ErrorAction SilentlyContinue
    Write-Host "  -> AGENTS.md modo cloud" -ForegroundColor Cyan
  } else {
    Rename-Item -Path "AGENTS.md" -NewName "AGENTS-LOCAL.md" -Force -ErrorAction SilentlyContinue
    Rename-Item -Path "AGENTS-CLOUD.md" -NewName "AGENTS.md" -Force -ErrorAction SilentlyContinue
    Write-Host "  -> AGENTS.md modo local" -ForegroundColor Cyan
  }
}

function Switch-OpencodeJson {
  if ($Mode -eq "cloud") {
    Copy-Item -Path "opencode-cloud.json" -Destination "opencode.json" -Force
    Write-Host "  -> opencode.json modo cloud" -ForegroundColor Cyan
  } else {
    Copy-Item -Path "opencode-local.json" -Destination "opencode.json" -Force
    Write-Host "  -> opencode.json modo local" -ForegroundColor Cyan
  }
}

Write-Host "=== Cambiando a modo $Mode ===" -ForegroundColor Magenta
Switch-AgentsMd
Switch-OpencodeJson
Write-Host "=== Listo ===" -ForegroundColor Green
