$b = Invoke-WebRequest -Uri 'http://localhost:5000/' -UseBasicParsing -ErrorAction SilentlyContinue
if ($b) { Write-Host "Backend : $($b.StatusCode) OK" } else { Write-Host "Backend : ERROR - not reachable" }

$f = Invoke-WebRequest -Uri 'http://localhost:5173/' -UseBasicParsing -ErrorAction SilentlyContinue
if ($f) { Write-Host "Frontend: $($f.StatusCode) OK" } else { Write-Host "Frontend: ERROR - not reachable" }

