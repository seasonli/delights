#! /bin/sh

echo "\n=============== Begin release ===============\n"
grunt clean:release
spm build
grunt release

# tar -czvf release.tar release/
# rm -rf release/
echo "\n=============== Finished release ===============\n"