<#
 verificar_datos_flyer.ps1 - Revisa flyers (PNG/JPG) contra docs\DATOS_OFICIALES.json.
 Lee el texto de cada imagen con el OCR de Windows (local, gratis, sin IA, sin claves, sin internet),
 busca telefonos y textos con error conocido y genera un informe. SOLO LECTURA: no modifica ninguna imagen.
 Uso (Windows PowerShell 5.1):
   powershell -NoProfile -ExecutionPolicy Bypass -File scripts\verificar_datos_flyer.ps1 -Carpeta "C:\ruta\flyers" [-Salida informe.md] [-Recursivo]
 Codigo de salida: 0 = sin problemas; 1 = hay piezas a REVISAR; 2 = error de uso.
 Limite: el OCR no es perfecto (texto pequeno o sobre foto puede no leerse). Una pieza "SIN TELEFONO LEIDO" no es un error: revisar a mano.
#>
param(
  [Parameter(Mandatory=$true)][string]$Carpeta,
  [string]$Salida = '',
  [string]$Datos = '',
  [switch]$Recursivo
)
$ErrorActionPreference = 'Stop'
if (-not $Datos) { $Datos = Join-Path (Split-Path -Parent $PSScriptRoot) 'docs\DATOS_OFICIALES.json' }
if (-not (Test-Path -LiteralPath $Carpeta)) { Write-Host "No existe la carpeta: $Carpeta"; exit 2 }
if (-not (Test-Path -LiteralPath $Datos))   { Write-Host "No existe el archivo de datos oficiales: $Datos"; exit 2 }
$of = Get-Content -LiteralPath $Datos -Raw -Encoding UTF8 | ConvertFrom-Json

function Solo8([string]$n) { $d = ($n -replace '\D',''); if ($d.Length -ge 8) { return $d.Substring($d.Length-8) } else { return $d } }
$validos    = @($of.telefonos_validos    | ForEach-Object { Solo8 $_.numero })
$eliminados = @($of.telefonos_eliminados | ForEach-Object { Solo8 $_ })
$conError   = @{}; foreach ($e in $of.telefonos_con_error_conocido) { $conError[(Solo8 $e.numero)] = $e.motivo }
$textosMalos = @($of.textos_con_error_conocido)

Add-Type -AssemblyName System.Runtime.WindowsRuntime
[void][Windows.Media.Ocr.OcrEngine,Windows.Foundation.UniversalApiContract,ContentType=WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapDecoder,Windows.Foundation.UniversalApiContract,ContentType=WindowsRuntime]
[void][Windows.Storage.StorageFile,Windows.Foundation.UniversalApiContract,ContentType=WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Esperar($op, $tipo) { $t = $asTask.MakeGenericMethod($tipo).Invoke($null, @($op)); [void]$t.Wait(-1); $t.Result }
$lang = [Windows.Media.Ocr.OcrEngine]::AvailableRecognizerLanguages | Where-Object { $_.LanguageTag -like 'es*' } | Select-Object -First 1
if (-not $lang) { Write-Host 'Windows no tiene el idioma de OCR en espanol (Configuracion > Hora e idioma).'; exit 2 }
$motor = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)

$opt = @{ LiteralPath = $Carpeta; File = $true }
if ($Recursivo) { $opt.Recurse = $true }
$archivos = Get-ChildItem @opt | Where-Object { $_.Extension -match '^\.(png|jpg|jpeg)$' } | Sort-Object FullName
if (-not $archivos) { Write-Host 'No hay imagenes PNG/JPG en la carpeta.'; exit 2 }

$filas = New-Object System.Collections.Generic.List[object]
foreach ($a in $archivos) {
  $estado = 'OK'; $detalle = @(); $nums = @()
  try {
    $sf  = Esperar ([Windows.Storage.StorageFile]::GetFileFromPathAsync($a.FullName)) ([Windows.Storage.StorageFile])
    $st  = Esperar ($sf.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $dec = Esperar ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($st)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bmp = Esperar ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = Esperar ($motor.RecognizeAsync($bmp)) ([Windows.Media.Ocr.OcrResult])
    $st.Dispose()
    $txt = ($res.Text -replace '\s+', ' ')
    $nums = @([regex]::Matches($txt, '(\+?\s?56\s?)?9\s?\d{4}\s?\d{4}') | ForEach-Object { Solo8 $_.Value } | Sort-Object -Unique)
    foreach ($n in $nums) {
      if ($conError.ContainsKey($n))      { $estado = 'REVISAR'; $detalle += "Telefono $n con error conocido: $($conError[$n])" }
      elseif ($eliminados -contains $n)   { $estado = 'REVISAR'; $detalle += "Telefono $n esta ELIMINADO (no debe aparecer)" }
      elseif ($validos -notcontains $n)   { $estado = 'REVISAR'; $detalle += "Telefono $n NO esta en la lista oficial" }
    }
    foreach ($m in $textosMalos) { if ($txt -match [regex]::Escape($m)) { $estado = 'REVISAR'; $detalle += "Texto con error conocido: '$m'" } }
    if ($nums.Count -eq 0 -and $estado -eq 'OK') { $estado = 'SIN TELEFONO LEIDO'; $detalle += 'No se leyo ningun telefono (revisar a mano si deberia llevarlo)' }
  } catch { $estado = 'ERROR DE LECTURA'; $detalle += $_.Exception.Message }
  $filas.Add([pscustomobject]@{ Archivo = $a.FullName; Estado = $estado; Telefonos = ($nums -join ' ; '); Detalle = ($detalle -join ' | ') })
}

$rev = @($filas | Where-Object { $_.Estado -eq 'REVISAR' })
$ok  = @($filas | Where-Object { $_.Estado -eq 'OK' })
$sin = @($filas | Where-Object { $_.Estado -eq 'SIN TELEFONO LEIDO' })
$err = @($filas | Where-Object { $_.Estado -eq 'ERROR DE LECTURA' })
$lineas = @()
$lineas += "# Verificacion de datos de flyers - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
$lineas += "Carpeta: $Carpeta | Datos oficiales: $Datos (version $($of.version))"
$lineas += "Resultado: $($filas.Count) imagenes | OK: $($ok.Count) | REVISAR: $($rev.Count) | sin telefono leido: $($sin.Count) | error de lectura: $($err.Count)"
$lineas += ''
$lineas += '| Estado | Archivo | Telefonos leidos | Detalle |'
$lineas += '|---|---|---|---|'
foreach ($f in ($filas | Sort-Object @{e={ switch ($_.Estado) { 'REVISAR' {0} 'ERROR DE LECTURA' {1} 'SIN TELEFONO LEIDO' {2} default {3} } }}, Archivo)) {
  $lineas += ('| {0} | {1} | {2} | {3} |' -f $f.Estado, $f.Archivo.Replace($Carpeta, '.'), $f.Telefonos, $f.Detalle)
}
$lineas += ''
$lineas += 'Nota: revision automatica con OCR local; no reemplaza la revision humana antes de publicar.'
$informe = $lineas -join [Environment]::NewLine
Write-Host $informe
if ($Salida) { [IO.File]::WriteAllText($Salida, $informe, (New-Object Text.UTF8Encoding $false)); Write-Host "`nInforme guardado en: $Salida" }
if ($rev.Count -gt 0) { exit 1 } else { exit 0 }