GIT=/usr/bin/git
gtd=~/GitHub/sinotec2.github.io
TOKEN=$(cat ~/bin/git.token)
today=$(date +%Y%m%d)
rundate=$(date)
cd $gtd
$GIT pull
for f in png.tar.gz PM25_TOT.gif;do
for i in 45 09 03;do 
$GIT add cmaq_forecast/grid$i/$f;git commit -m "revised grid$i/$f $rundate from imac"
$GIT push -f https://sinotec2:$TOKEN@github.com/sinotec2/sinotec2.github.io.git;done
sleep 600
done
