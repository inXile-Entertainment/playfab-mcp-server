# PlayFab MCP Server - Setup Script
# Configures the PlayFab MCP server for Claude Desktop, Claude Code, VS Code, and/or Cursor.
# Usage:  irm https://raw.githubusercontent.com/inXile-Entertainment/playfab-mcp/main/setup-playfab-mcp.ps1 -Headers @{Authorization="token $(gh auth token)"} | iex
# Or:     powershell -ExecutionPolicy Bypass -File setup-playfab-mcp.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Force = $false

# -- Helpers -----------------------------------------------------------------

function Write-Banner {
    Write-Host ""
    Write-Host "  +================================================+" -ForegroundColor Cyan
    Write-Host "  |       PlayFab MCP Server - Setup                |" -ForegroundColor Cyan
    Write-Host "  |  github.com/inXile-Entertainment/playfab-mcp    |" -ForegroundColor Cyan
    Write-Host "  +================================================+" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "  [*] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "  [-] $Message" -ForegroundColor Gray
}

function Write-Warn {
    param([string]$Message)
    Write-Host "  [!] $Message" -ForegroundColor Yellow
}

function Write-Err {
    param([string]$Message)
    Write-Host "  [X] $Message" -ForegroundColor Red
}

function Read-Required {
    param([string]$Prompt)
    do {
        $value = Read-Host "  $Prompt"
        if ([string]::IsNullOrWhiteSpace($value)) {
            Write-Warn "This field is required."
        }
    } while ([string]::IsNullOrWhiteSpace($value))
    return $value.Trim()
}

function Read-Optional {
    param([string]$Prompt)
    $value = Read-Host "  $Prompt (press Enter to skip)"
    if ([string]::IsNullOrWhiteSpace($value)) { return $null }
    return $value.Trim()
}

# -- Check prerequisites -----------------------------------------------------

function Test-NodeInstalled {
    try {
        $version = & node --version 2>$null
        if ($version -match '^v(\d+)') {
            $major = [int]$Matches[1]
            if ($major -ge 18) {
                return $true
            }
            Write-Err "Node.js $version found but v18+ is required."
            return $false
        }
    } catch {}
    return $false
}

# -- Merge MCP config via Node.js --------------------------------------------

function Merge-McpConfig {
    param(
        [string]$Path,
        [string]$ServerKey,
        [string]$WrapperKey,
        [string]$EnvJson,
        [string]$Label
    )

    if ((Test-Path $Path) -and -not $Force) {
        $hasKey = & node -e "
            try {
                const c = JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));
                process.stdout.write(String(!!(c[process.argv[2]]||{})[process.argv[3]]));
            } catch { process.stdout.write('false'); }
        " $Path $WrapperKey $ServerKey
        if ($hasKey -eq 'true') {
            Write-Warn "$Label already has a '$ServerKey' MCP server configured in: $Path"
            $overwrite = Read-Host "  Overwrite the playfab entry? (y/N)"
            if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
                Write-Info "Skipped $Label."
                return
            }
        }
    }

    $dir = Split-Path -Parent $Path
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    & node -e "
        const fs = require('fs');
        const filePath = process.argv[1];
        const wrapperKey = process.argv[2];
        const serverKey = process.argv[3];
        const envJson = process.argv[4];

        let config = {};
        try { config = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch {}

        if (!config[wrapperKey]) config[wrapperKey] = {};
        config[wrapperKey][serverKey] = {
            command: 'npx',
            args: ['-y', 'github:inXile-Entertainment/playfab-mcp'],
            env: JSON.parse(envJson)
        };

        fs.writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n');
    " $Path $WrapperKey $ServerKey $EnvJson

    if ($LASTEXITCODE -ne 0) {
        Write-Err "Failed to write $Label config."
        return
    }
    Write-Step "$Label configured: $Path"
}

# -- Main --------------------------------------------------------------------

function Main {
    Write-Banner

    # Check Node.js
    if (-not (Test-NodeInstalled)) {
        Write-Err "Node.js 18+ is required. Install from https://nodejs.org/"
        Write-Host ""
        exit 1
    }
    $nodeVersion = & node --version
    Write-Step "Node.js $nodeVersion detected"

    # -- Collect credentials ---------------------------------------------------
    Write-Host ""
    Write-Host "  --- PlayFab Credentials (required) ---" -ForegroundColor White
    Write-Info "Find these in PlayFab Game Manager > Settings"
    Write-Host ""

    $titleId   = Read-Required "PlayFab Title ID (e.g. F85D2)"
    $secretKey = Read-Required "PlayFab Developer Secret Key"

    # Validate title ID format
    if ($titleId -notmatch '^[A-Fa-f0-9]{5}$') {
        Write-Warn "Title ID '$titleId' doesn't match the expected 5 hex character format."
        $proceed = Read-Host "  Continue anyway? (y/N)"
        if ($proceed -ne 'y' -and $proceed -ne 'Y') { exit 0 }
    }

    Write-Host ""
    Write-Host "  --- Azure AD Credentials (optional, for analytics/KQL) ---" -ForegroundColor White
    Write-Info "Required only for running KQL queries against PlayFab Insights."
    Write-Info "Skip all three to disable analytics."
    Write-Host ""

    $tenantId     = Read-Optional "Azure Tenant ID"
    $clientId     = Read-Optional "Azure Client ID"
    $clientSecret = Read-Optional "Azure Client Secret"

    $adxClusterUrl = $null
    $adxDatabase   = $null

    if ($tenantId -and $clientId -and $clientSecret) {
        Write-Step "Analytics credentials provided"

        Write-Host ""
        Write-Host "  --- Custom ADX Cluster (optional, advanced) ---" -ForegroundColor White
        Write-Info "Skip both to use the default PlayFab Insights endpoint."
        Write-Info "Only needed if your team has a dedicated Azure Data Explorer cluster."
        Write-Host ""

        $adxClusterUrl = Read-Optional "ADX Cluster URL (e.g. https://mycluster.eastus2.kusto.windows.net)"
        $adxDatabase   = Read-Optional "ADX Database name"

        if ($adxClusterUrl -and $adxDatabase) {
            Write-Step "Custom ADX cluster configured"
        } elseif ($adxClusterUrl -or $adxDatabase) {
            Write-Warn "Both Cluster URL and Database are needed for a custom ADX cluster."
            $proceed = Read-Host "  Continue with default PlayFab Insights? (Y/n)"
            if ($proceed -eq 'n' -or $proceed -eq 'N') { exit 0 }
            $adxClusterUrl = $null; $adxDatabase = $null
        } else {
            Write-Info "Using default PlayFab Insights endpoint."
        }
    } elseif ($tenantId -or $clientId -or $clientSecret) {
        Write-Warn "Partial Azure credentials. All three (Tenant ID, Client ID, Client Secret) are needed for analytics."
        $proceed = Read-Host "  Continue without analytics? (Y/n)"
        if ($proceed -eq 'n' -or $proceed -eq 'N') { exit 0 }
        $tenantId = $null; $clientId = $null; $clientSecret = $null
    } else {
        Write-Info "Analytics skipped (no Azure credentials)."
    }

    # Build env JSON via Node to avoid PowerShell encoding issues
    $envPairs = @("PLAYFAB_TITLE_ID=$titleId", "PLAYFAB_DEV_SECRET_KEY=$secretKey")
    if ($tenantId)      { $envPairs += "AZURE_TENANT_ID=$tenantId" }
    if ($clientId)      { $envPairs += "AZURE_CLIENT_ID=$clientId" }
    if ($clientSecret)  { $envPairs += "AZURE_CLIENT_SECRET=$clientSecret" }
    if ($adxClusterUrl) { $envPairs += "AZURE_ADX_CLUSTER_URL=$adxClusterUrl" }
    if ($adxDatabase)   { $envPairs += "AZURE_ADX_DATABASE=$adxDatabase" }
    $envJson = & node -e "
        const o = {};
        process.argv.slice(1).forEach(p => { const i = p.indexOf('='); o[p.slice(0,i)] = p.slice(i+1); });
        process.stdout.write(JSON.stringify(o));
    " @envPairs

    # -- Select clients --------------------------------------------------------
    Write-Host ""
    Write-Host "  --- Select AI Client(s) to configure ---" -ForegroundColor White
    Write-Host ""
    Write-Host "    1) Claude Desktop"
    Write-Host "    2) Claude Code (CLI)"
    Write-Host "    3) VS Code"
    Write-Host "    4) Cursor"
    Write-Host "    5) All of the above"
    Write-Host ""

    $selection = Read-Host "  Enter choice (1-5, comma-separated for multiple)"
    $choices = $selection -split '[,\s]+' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }

    if ($choices -contains '5') {
        $choices = @('1', '2', '3', '4')
    }

    $configured = @()

    Write-Host ""

    # -- Claude Desktop --------------------------------------------------------
    if ($choices -contains '1') {
        $claudeDesktopPath = Join-Path $env:APPDATA "Claude\claude_desktop_config.json"
        Merge-McpConfig -Path $claudeDesktopPath `
            -ServerKey "playfab" `
            -WrapperKey "mcpServers" `
            -EnvJson $envJson `
            -Label "Claude Desktop"
        $configured += "Claude Desktop"
    }

    # -- Claude Code -----------------------------------------------------------
    if ($choices -contains '2') {
        $claudeCodePath = Join-Path $env:USERPROFILE ".claude\mcp.json"
        Merge-McpConfig -Path $claudeCodePath `
            -ServerKey "playfab" `
            -WrapperKey "mcpServers" `
            -EnvJson $envJson `
            -Label "Claude Code"
        $configured += "Claude Code"
    }

    # -- VS Code ---------------------------------------------------------------
    if ($choices -contains '3') {
        Write-Host ""
        $vscodePath = Read-Host "  VS Code project path (where .vscode/ will be created)"
        if ([string]::IsNullOrWhiteSpace($vscodePath)) {
            $vscodePath = Get-Location
            Write-Info "Using current directory: $vscodePath"
        }
        $vscodeConfigPath = Join-Path $vscodePath ".vscode\mcp.json"
        Merge-McpConfig -Path $vscodeConfigPath `
            -ServerKey "PlayFab" `
            -WrapperKey "servers" `
            -EnvJson $envJson `
            -Label "VS Code"
        $configured += "VS Code"
    }

    # -- Cursor ----------------------------------------------------------------
    if ($choices -contains '4') {
        Write-Host ""
        $cursorPath = Read-Host "  Cursor project path (where .cursor/ will be created)"
        if ([string]::IsNullOrWhiteSpace($cursorPath)) {
            $cursorPath = Get-Location
            Write-Info "Using current directory: $cursorPath"
        }
        $cursorConfigPath = Join-Path $cursorPath ".cursor\mcp.json"
        Merge-McpConfig -Path $cursorConfigPath `
            -ServerKey "playfab" `
            -WrapperKey "mcpServers" `
            -EnvJson $envJson `
            -Label "Cursor"
        $configured += "Cursor"
    }

    # -- Summary ---------------------------------------------------------------
    Write-Host ""
    Write-Host "  ------------------------------------------------" -ForegroundColor Cyan

    if ($configured.Count -eq 0) {
        Write-Warn "No clients were configured."
    } else {
        Write-Step "Setup complete! Configured: $($configured -join ', ')"
        Write-Host ""
        Write-Info "Next steps:"
        Write-Info "  1. Restart your AI client(s)"
        Write-Info "  2. Try: `"Show me the latest 10 items`""
        if ($tenantId) {
            Write-Info "  3. Try analytics: ['ingested-data'] | take 10"
        }
    }

    Write-Host ""
}

# Run
Main
