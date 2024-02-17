$files = Get-ChildItem -Path "." -Filter "*.cs"
$regexNamespace = "^namespace\s+(.+)"
$regexClass = "^\s+public( sealed)?\s+class\s+(\w+)"
$regexDiscoverableProperty = "DiscoverableProperty\(""[^""]+"",\s*(true|false),\s*""([^""]+)"""
$regexBaseClass = "\s*:\s*(\w+PropertyWatcher)"
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
            $className = $Matches[1]
            $label = [regex]::Replace($className.Replace("Watcher", ""), $regexReplacePascalCase, " ")
        }

        if ($line -match $regexDiscoverableProperty)
        {
            $description = $Matches[2]
        }

        if ($line -match $regexBaseClass)
        {
            $category = $Matches[1].Replace("PropertyWatcher", "")
            $category = [regex]::Replace($category, $regexReplacePascalCase, " ")
        }
    }

    $className = $namespaceName + "." + $className + ", Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null"


    if ($label -ne "" -and $category -ne "")
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