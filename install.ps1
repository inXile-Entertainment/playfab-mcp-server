# PlayFab MCP - Full Installer
# Installs prerequisites (Node.js, GitHub CLI), authenticates, and runs setup.
# Usage:  powershell -ExecutionPolicy Bypass -File install.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:ghToken = $null

function Write-Step  { param([string]$M) Write-Host "  [*] $M" -ForegroundColor Green }
function Write-Info  { param([string]$M) Write-Host "  [-] $M" -ForegroundColor Gray }
function Write-Warn  { param([string]$M) Write-Host "  [!] $M" -ForegroundColor Yellow }
function Write-Err   { param([string]$M) Write-Host "  [X] $M" -ForegroundColor Red }

function Invoke-GitHubApi {
    param([string]$Endpoint, [string]$Accept)
    $headers = @{}
    if ($Accept) { $headers['Accept'] = $Accept }

    if ($script:ghToken) {
        $headers['Authorization'] = "token $($script:ghToken)"
        return Invoke-RestMethod -Uri "https://api.github.com/$Endpoint" -Headers $headers
    } else {
        $args = @($Endpoint)
        if ($Accept) { $args += '-H'; $args += "Accept: $Accept" }
        return (& gh api @args)
    }
}

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
    $env:PATH = [System.Environment]::GetEnvironmentVariable('PATH', 'Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH', 'User')
    try {
        $v = & node --version 2>$null
        Write-Step "Node.js $v installed"
    } catch {
        Write-Err "Node.js installed but not found in PATH. Close and reopen PowerShell, then run this script again."
        exit 1
    }
}

# -- 2. GitHub authentication ---------------------------------------------------

$hasGh = $false
try {
    $ghv = & gh --version 2>$null | Select-Object -First 1
    if ($ghv) { $hasGh = $true }
} catch {}

if ($hasGh) {
    Write-Step "GitHub CLI found ($ghv)"
    $ghAuth = & gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Warn "Not logged in to GitHub. Starting authentication..."
        Write-Host ""
        & gh auth login
        if ($LASTEXITCODE -ne 0) {
            Write-Err "GitHub authentication failed."
            exit 1
        }
    }
    Write-Step "GitHub CLI authenticated"
} else {
    Write-Warn "GitHub CLI not found. You can authenticate with a Personal Access Token instead."
    Write-Info "Create one at: https://github.com/settings/tokens"
    Write-Info "Required scope: repo (Full control of private repositories)"
    Write-Host ""
    Write-Host "  Options:" -ForegroundColor White
    Write-Host "    1) Enter a Personal Access Token now"
    Write-Host "    2) Install GitHub CLI first (recommended for future use)"
    Write-Host ""
    $choice = Read-Host "  Enter choice (1 or 2)"

    if ($choice -eq '2') {
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
            $hasGh = $true
        } catch {
            Write-Err "GitHub CLI installed but not found in PATH. Close and reopen PowerShell, then run this script again."
            exit 1
        }
        Write-Warn "Not logged in to GitHub. Starting authentication..."
        Write-Host ""
        & gh auth login
        if ($LASTEXITCODE -ne 0) {
            Write-Err "GitHub authentication failed."
            exit 1
        }
        Write-Step "GitHub CLI authenticated"
    } else {
        $token = Read-Host "  GitHub Personal Access Token"
        if ([string]::IsNullOrWhiteSpace($token)) {
            Write-Err "Token is required."
            exit 1
        }
        $script:ghToken = $token.Trim()
        Write-Step "Token provided"
    }
}

# -- 3. Verify repo access ------------------------------------------------------

Write-Info "Checking access to inXile-Entertainment/playfab-mcp..."
try {
    $repoName = Invoke-GitHubApi -Endpoint "repos/inXile-Entertainment/playfab-mcp"
    Write-Step "Repository access confirmed"
} catch {
    Write-Err "Cannot access inXile-Entertainment/playfab-mcp. Check your credentials or ask your admin for access."
    exit 1
}

# -- 4. Download and run setup script -------------------------------------------

Write-Host ""
Write-Info "Downloading setup script..."

$setupFile = Join-Path $env:TEMP "setup-playfab-mcp.ps1"

if ($script:ghToken) {
    $headers = @{
        Authorization = "token $($script:ghToken)"
        Accept = 'application/vnd.github.raw'
    }
    $content = Invoke-RestMethod -Uri "https://api.github.com/repos/inXile-Entertainment/playfab-mcp/contents/setup-playfab-mcp.ps1" -Headers $headers
    Set-Content -Path $setupFile -Value $content -Encoding ascii
} else {
    & gh api repos/inXile-Entertainment/playfab-mcp/contents/setup-playfab-mcp.ps1 -H "Accept: application/vnd.github.raw" > $setupFile
    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to download setup script."
        exit 1
    }
}

Write-Host ""
& $setupFile
Remove-Item $setupFile -ErrorAction SilentlyContinue
