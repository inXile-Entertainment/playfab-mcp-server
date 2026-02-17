# PlayFab MCP - Full Installer
# Installs prerequisites (Node.js, GitHub CLI), authenticates, and runs setup.
# Usage:  powershell -ExecutionPolicy Bypass -File install.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Step  { param([string]$M) Write-Host "  [*] $M" -ForegroundColor Green }
function Write-Info  { param([string]$M) Write-Host "  [-] $M" -ForegroundColor Gray }
function Write-Warn  { param([string]$M) Write-Host "  [!] $M" -ForegroundColor Yellow }
function Write-Err   { param([string]$M) Write-Host "  [X] $M" -ForegroundColor Red }

Write-Host ""
Write-Host "  +================================================+" -ForegroundColor Cyan
Write-Host "  |   PlayFab MCP - Full Installer                  |" -ForegroundColor Cyan
Write-Host "  +================================================+" -ForegroundColor Cyan
Write-Host ""

# -- 1. Node.js ----------------------------------------------------------------

$hasNode = $false
try {
    $v = & node --version 2>$null
    if ($v -match '^v(\d+)' -and [int]$Matches[1] -ge 18) {
        Write-Step "Node.js $v already installed"
        $hasNode = $true
    } else {
        Write-Warn "Node.js $v found but v18+ is required."
    }
} catch {}

if (-not $hasNode) {
    Write-Info "Installing Node.js LTS via winget..."
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to install Node.js. Install manually from https://nodejs.org/"
        exit 1
    }
    # Refresh PATH so node is available in this session
    $env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH', 'User')
    try {
        $v = & node --version 2>$null
        Write-Step "Node.js $v installed"
    } catch {
        Write-Err "Node.js installed but not found in PATH. Close and reopen PowerShell, then run this script again."
        exit 1
    }
}

# -- 2. GitHub CLI --------------------------------------------------------------

$hasGh = $false
try {
    $ghv = & gh --version 2>$null | Select-Object -First 1
    if ($ghv) {
        Write-Step "GitHub CLI already installed ($ghv)"
        $hasGh = $true
    }
} catch {}

if (-not $hasGh) {
    Write-Info "Installing GitHub CLI via winget..."
    winget install GitHub.cli --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to install GitHub CLI. Install manually from https://cli.github.com/"
        exit 1
    }
    $env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH', 'User')
    try {
        $ghv = & gh --version 2>$null | Select-Object -First 1
        Write-Step "GitHub CLI installed ($ghv)"
    } catch {
        Write-Err "GitHub CLI installed but not found in PATH. Close and reopen PowerShell, then run this script again."
        exit 1
    }
}

# -- 3. GitHub authentication ---------------------------------------------------

$ghAuth = & gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Warn "Not logged in to GitHub. Starting authentication..."
    Write-Host ""
    & gh auth login
    if ($LASTEXITCODE -ne 0) {
        Write-Err "GitHub authentication failed."
        exit 1
    }
    Write-Step "GitHub authentication complete"
} else {
    Write-Step "GitHub CLI already authenticated"
}

# -- 4. Verify repo access ------------------------------------------------------

Write-Info "Checking access to inXile-Entertainment/playfab-mcp..."
$repoCheck = & gh api repos/inXile-Entertainment/playfab-mcp --jq .name 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Err "Cannot access inXile-Entertainment/playfab-mcp. Ask your admin for repository access."
    exit 1
}
Write-Step "Repository access confirmed"

# -- 5. Run setup script --------------------------------------------------------

Write-Host ""
Write-Info "Downloading and running setup script..."
Write-Host ""

$setupFile = Join-Path $env:TEMP "setup-playfab-mcp.ps1"
& gh api repos/inXile-Entertainment/playfab-mcp/contents/setup-playfab-mcp.ps1 -H "Accept: application/vnd.github.raw" > $setupFile
if ($LASTEXITCODE -ne 0) {
    Write-Err "Failed to download setup script."
    exit 1
}
& $setupFile
Remove-Item $setupFile -ErrorAction SilentlyContinue
