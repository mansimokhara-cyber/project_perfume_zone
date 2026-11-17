$headers = @{ "Content-Type" = "application/json" }

Write-Host "=== Health ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/" -Method GET | ConvertTo-Json -Depth 2

Write-Host "`n=== Register ===" -ForegroundColor Cyan
$reg = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers $headers -Body '{"name":"Test User","email":"test@perfumezone.com","password":"secret123"}'
$reg | ConvertTo-Json -Depth 2
$token = $reg.token

Write-Host "`n=== Login ===" -ForegroundColor Cyan
$login = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Headers $headers -Body '{"email":"test@perfumezone.com","password":"secret123"}'
$login | ConvertTo-Json -Depth 2

Write-Host "`n=== Products (All) ===" -ForegroundColor Cyan
$products = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
"Total: $($products.total) products"

Write-Host "`n=== Products (FLORAL, sort by rating) ===" -ForegroundColor Cyan
$floral = Invoke-RestMethod -Uri "http://localhost:5000/api/products?category=FLORAL&sort=rating" -Method GET
$floral.data | ForEach-Object { "$($_.name) - $($_.rating)" }

Write-Host "`n=== Promo: LUXURY10 ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/api/promo/validate" -Method POST -Headers $headers -Body '{"code":"LUXURY10"}' | ConvertTo-Json

Write-Host "`n=== Promo: INVALID ===" -ForegroundColor Cyan
try {
  Invoke-RestMethod -Uri "http://localhost:5000/api/promo/validate" -Method POST -Headers $headers -Body '{"code":"FAKECODE"}'
} catch {
  $_.Exception.Response.StatusCode
}

Write-Host "`n=== Add to Cart (authenticated) ===" -ForegroundColor Cyan
$authHeaders = @{ "Content-Type" = "application/json"; "Authorization" = "Bearer $token" }
$addCart = Invoke-RestMethod -Uri "http://localhost:5000/api/cart/add" -Method POST -Headers $authHeaders -Body '{"productId":"velvet-amber-oudh","size":"50ml","quantity":2}'
$addCart | ConvertTo-Json -Depth 3

Write-Host "`n=== Get Cart ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "http://localhost:5000/api/cart" -Method GET -Headers $authHeaders | ConvertTo-Json -Depth 3

Write-Host "`n=== Quiz Recommend ===" -ForegroundColor Cyan
$quiz = Invoke-RestMethod -Uri "http://localhost:5000/api/quiz/recommend" -Method POST -Headers $headers -Body '{"scent_family":"FLORAL","occasion":"sensual","vibe":"warm"}'
$quiz.data | ForEach-Object { "$($_.name) [$($_.category)]" }

Write-Host "`n=== Place Order ===" -ForegroundColor Cyan
$order = Invoke-RestMethod -Uri "http://localhost:5000/api/orders" -Method POST -Headers $authHeaders -Body '{"shippingAddress":"123 Luxury Lane, Mumbai","promoCode":"LUXURY10"}'
$order | ConvertTo-Json -Depth 3

Write-Host "`nAll tests complete!" -ForegroundColor Green

