$origin = Get-Location

$DIR = $PSScriptRoot
$ROOT = "$DIR/.."

function removeBuilds()
{
    rm -Recurse -Force $ROOT/back/build
    rm -Recurse -Force $ROOT/front/build
}

function runForEnv($env, $tag)
{
    echo "Running for env=${env} tag=${tag}"

    Set-Location $ROOT/back
    npm run build

    Set-Location $ROOT/front
    set PUBLIC_URL $env; npm run build

    cp "$DIR/Dockerfile" "$DIR/../Dockerfile"
    cd $ROOT; docker buildx build --platform "linux/amd64,linux/arm64"  -f ./Dockerfile -t "elyspio/command-runner:${tag}" --push .
    rm "$DIR/../Dockerfile"
}

runForEnv  "/runner/rama-x/" "rama-x"
runForEnv "/runner/elyspi-4/" "elyspi-4"
runForEnv "/runner/aero-oled/" "aero-oled"


removeBuilds
cd $origin




