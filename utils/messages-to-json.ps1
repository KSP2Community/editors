$files = Get-ChildItem -Path "." -Filter "*.cs"
$regexNamespace = "^namespace\s+(.+)"
$regexClass = "^\s+public( sealed)?\s+class\s+(\w+)"
$regexDiscoverableProperty = "DiscoverableMessage\(""[^""]+"",\s*(true|false),\s*""([^""]+)"""
$regexBaseClass = "\s*:\s*(\w+MessageBase)"
$regexVesselMessage = "\s*:\s*VesselMessage"
$regexReplacePascalCase = "(?<=\p{Ll})(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})"

$outputArray = @()

foreach ($file in $files)
{
    $namespaceName = ""
    $className = ""
    $category = ""
    $description = ""
    $label = ""

    $lines = Get-Content $file.FullName
    foreach ($line in $lines)
    {
        if ($line -match $regexNamespace)
        {
            $namespaceName = $Matches[1]
        }

        if ($line -match $regexClass)
        {
            $className = $Matches[2]
            $label = [regex]::Replace($className.Replace("Message", ""), $regexReplacePascalCase, " ")
        }

        if ($line -match $regexDiscoverableProperty)
        {
            $description = $Matches[2]
        }

        if ($line -match $regexBaseClass)
        {
            $category = $Matches[1].Replace("MessageBase", "")
            $category = [regex]::Replace($category, $regexReplacePascalCase, " ")
        }
        elseif ($line -match $regexVesselMessage)
        {
            $category = "Vessel"
        }

        if ($category -eq "")
        {
            $category = "General"
        }
    }

    $className = $namespaceName + "." + $className + ", Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null"

    if ($label -ne "" -and $label -notlike "*Base")
    {
        $output = @{
            type = $className
            label = $label
            description = $description
            category = $category
        }

        $outputArray += $output
    }
}

$outputArray | ConvertTo-Json | Set-Content output.json