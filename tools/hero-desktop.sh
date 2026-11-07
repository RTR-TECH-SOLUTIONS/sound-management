#!/bin/zsh
# Montajul hero pentru desktop (1280x720). Folosește bucățile 4K din src/ făcute de tools/hero-telefon.sh
# (rulează în același folder de lucru), apoi exportă în public/video/hero.{mp4,webm} + poster.
set -e
OUT="$1"   # folderul public/video al proiectului
F="/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf"; RED="#e1252f"
mkdir -p titles_d seg_d
magick -size 1280x720 xc:none -fill "rgba(0,0,0,0.6)" -draw "ellipse 640,365 470,140 0,360" -blur 0x60 -define png:color-type=6 scrim_d.png
mk() { full="$2"; [ -n "$3" ] && full="$2 $3"
  magick -size 1600x300 xc:none -font "$F" -pointsize 168 -kerning 2 -fill white -annotate +20+220 "$full" -fill "$RED" -annotate +20+220 "$2" -trim +repage t.png
  magick -background none -font "$F" -pointsize 36 -kerning 6 -fill "#f2ede7" label:"$4" -gravity north -splice 0x26 s.png
  magick t.png s.png -gravity center -background none -append -resize '860x>' block.png
  magick block.png \( +clone -background black -shadow 70x14+0+6 \) +swap -background none -layers merge +repage block2.png
  magick -size 1280x720 xc:none block2.png -gravity center -geometry +0+10 -composite t_$1.png
  magick t_$1.png scrim_d.png -compose DstOver -composite -define png:color-type=6 titles_d/ts$1.png; rm t_$1.png; }
mk 0 "SOUND" "MANAGEMENT" "SONORIZĂRI  ·  ECRANE LED  ·  LUMINI  ·  TRADUCERE SIMULTANĂ"
mk 1 "SONORIZARE" "" "PENTRU CONFERINȚE ȘI EVENIMENTE CORPORATE"
mk 2 "ECRANE" "LED" "MODULARE, PENTRU SCENĂ ȘI CONFERINȚE"
mk 3 "LUMINI" "DE SCENĂ" "AMBIENT, MOVING HEADS, EFECTE"
mk 4 "TRADUCERE" "SIMULTANĂ" "CABINE, RECEPTOARE, CĂȘTI"
mk 5 "FOTO" "ȘI VIDEO" "FOTOGRAFII ȘI FILMARE LA EVENIMENT"
rm -f t.png s.png block.png block2.png
GRADE="scale=1280:720:flags=lanczos:force_original_aspect_ratio=increase,crop=1280:720,fps=30,setsar=1,eq=contrast=1.1:brightness=-0.05:saturation=1.08,vignette=PI/5,format=yuv420p"
seg() { local fo=$(echo "$3 - 0.8" | bc); local extra="$5"
  ffmpeg -loglevel error -y -i "src/$2.mp4" -loop 1 -t "$3" -i "titles_d/$4.png" -filter_complex \
   "[0:v]${GRADE}${extra}[v];[1:v]format=rgba,fade=t=in:st=0.35:d=0.45:alpha=1,fade=t=out:st=${fo}:d=0.45:alpha=1[t];[v][t]overlay=0:0,format=yuv420p" \
   -t "$3" -an -c:v libx264 -crf 16 -preset fast "seg_d/s$1.mp4"; }
seg 0 scena-bokeh 4.2 ts0
seg 1 mixer 3.6 ts1
seg 2 led 3.6 ts2 ",eq=brightness=-0.08:saturation=0.85"
seg 3 lumini 3.6 ts3
seg 4 casti 3.6 ts4 ",eq=brightness=-0.22:contrast=1.05"
seg 5 camera 3.6 ts5
ffmpeg -loglevel error -y -i seg_d/s0.mp4 -i seg_d/s1.mp4 -i seg_d/s2.mp4 -i seg_d/s3.mp4 -i seg_d/s4.mp4 -i seg_d/s5.mp4 -filter_complex \
"[0][1]xfade=transition=fade:duration=0.5:offset=3.7[a];[a][2]xfade=transition=fade:duration=0.5:offset=6.8[b];[b][3]xfade=transition=fade:duration=0.5:offset=9.9[c];[c][4]xfade=transition=fade:duration=0.5:offset=13.0[d];[d][5]xfade=transition=fade:duration=0.5:offset=16.1[e];[e]fade=t=in:st=0:d=0.4,fade=t=out:st=19.2:d=0.5,format=yuv420p[v]" \
-map "[v]" -an -c:v libx264 -crf 16 -preset fast hero_d_master.mp4
ffmpeg -loglevel error -y -i hero_d_master.mp4 -an -c:v libx264 -crf 25 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart "$OUT/hero.mp4"
ffmpeg -loglevel error -y -i hero_d_master.mp4 -an -c:v libvpx-vp9 -crf 37 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 "$OUT/hero.webm"
ffmpeg -loglevel error -y -ss 1.7 -i hero_d_master.mp4 -frames:v 1 -q:v 3 "$OUT/hero-poster.jpg"
echo "desktop gata"
