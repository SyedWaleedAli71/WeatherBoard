Add-Type -AssemblyName System.Drawing

function New-WeatherBoardIcon {
  param(
    [int]$Size,
    [string]$Path
  )

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::FromArgb(255, 11, 18, 32))

  $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
  $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 20, 38, 58),
    [System.Drawing.Color]::FromArgb(255, 11, 18, 32),
    45.0
  )
  $graphics.FillRectangle($background, $rect)

  $s = [double]$Size

  # Soft cyan glow behind the sun.
  $glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glowRect = New-Object System.Drawing.RectangleF(
    [single](0.28 * $s), [single](0.10 * $s),
    [single](0.64 * $s), [single](0.64 * $s)
  )
  $glowPath.AddEllipse($glowRect)
  $glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
  $glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(90, 56, 189, 248)
  $glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 56, 189, 248))
  $graphics.FillEllipse($glowBrush, $glowRect)

  # Sun.
  $sunX = 0.60 * $s
  $sunY = 0.38 * $s
  $sunRadius = 0.145 * $s
  $sunRect = New-Object System.Drawing.RectangleF(
    [single]($sunX - $sunRadius), [single]($sunY - $sunRadius),
    [single]($sunRadius * 2), [single]($sunRadius * 2)
  )
  $sunBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.RectangleF(0, 0, [single]($sunRadius * 2), [single]($sunRadius * 2))),
    [System.Drawing.Color]::FromArgb(255, 125, 211, 252),
    [System.Drawing.Color]::FromArgb(255, 14, 165, 233),
    45.0
  )
  $graphics.FillEllipse($sunBrush, $sunRect)

  # Cloud.
  $cloudBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.RectangleF(0, [single](0.42 * $s), $Size, [single](0.40 * $s))),
    [System.Drawing.Color]::FromArgb(255, 248, 252, 255),
    [System.Drawing.Color]::FromArgb(255, 203, 225, 242),
    90.0
  )

  $graphics.FillEllipse($cloudBrush, [single](0.25 * $s), [single](0.51 * $s), [single](0.26 * $s), [single](0.26 * $s))
  $graphics.FillEllipse($cloudBrush, [single](0.38 * $s), [single](0.44 * $s), [single](0.36 * $s), [single](0.36 * $s))
  $graphics.FillEllipse($cloudBrush, [single](0.57 * $s), [single](0.52 * $s), [single](0.24 * $s), [single](0.24 * $s))
  $graphics.FillRectangle($cloudBrush, [single](0.24 * $s), [single](0.63 * $s), [single](0.58 * $s), [single](0.14 * $s))

  # Small horizon accent.
  $horizonPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(150, 56, 189, 248), [single](0.012 * $s))
  $horizonPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $horizonPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $graphics.DrawLine($horizonPen, [single](0.27 * $s), [single](0.80 * $s), [single](0.73 * $s), [single](0.80 * $s))

  # Inset border.
  $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 45, 78, 108), [single](0.012 * $s))
  $graphics.DrawRectangle($borderPen, [single](0.008 * $s), [single](0.008 * $s), [single](0.984 * $s), [single](0.984 * $s))

  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $horizonPen.Dispose()
  $borderPen.Dispose()
  $sunBrush.Dispose()
  $cloudBrush.Dispose()
  $glowBrush.Dispose()
  $glowPath.Dispose()
  $background.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

$projectRoot = Split-Path $PSScriptRoot -Parent
$outDir = Join-Path $projectRoot "public\icons"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
New-WeatherBoardIcon -Size 192 -Path (Join-Path $outDir "pwa-192.png")
New-WeatherBoardIcon -Size 512 -Path (Join-Path $outDir "pwa-512.png")

Get-ChildItem $outDir | Select-Object Name, Length
