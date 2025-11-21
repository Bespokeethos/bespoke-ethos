# Runs git pull/push with optional auto-commit.
param(
    [string]$Message = ("chore: codex auto sync {0:yyyy-MM-dd HH:mm}" -f (Get-Date)),
    [switch]$NoCommit
)

function Invoke-CodexStep {
    param(
        [string]$Command,
        [string[]]$Arguments
    )

    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = "git"
    $psi.Arguments = @($Command) + $Arguments -join " "
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.UseShellExecute = $false
    $psi.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $psi
    $null = $process.Start()
    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()

    if ($stdout) { Write-Host $stdout.Trim() }
    if ($stderr) { Write-Error $stderr.Trim() }
    if ($process.ExitCode -ne 0) {
        throw "Command 'git $Command $($Arguments -join ' ') ' failed with exit code $($process.ExitCode)"
    }
}

$status = git status --porcelain
if ($status) {
    if ($NoCommit) {
        Write-Error "Working tree has changes. Commit them or rerun without -NoCommit."
        exit 1
    }

    git add -A | Out-Null
    if (git diff --staged --quiet) {
        Write-Host "No staged changes after add; skipping commit."
    }
    else {
        git commit -m $Message | Out-Null
    }
}

try {
    Invoke-CodexStep -Command "pull" -Arguments @("--rebase")
}
catch {
    Write-Error "Failed to pull latest changes. Resolve conflicts or rerun."
    exit 1
}

Invoke-CodexStep -Command "push" -Arguments @()
