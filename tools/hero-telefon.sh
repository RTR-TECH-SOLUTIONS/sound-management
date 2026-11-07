#!/bin/zsh
set -e
# Montajul hero pentru telefon (720x1560) din originalele 4K de pe Pexels. Rulează într-un folder de lucru gol,
# apoi exportă hero_v_master.mp4 în public/video/hero-telefon.{mp4,webm} + poster (vezi README-DEMO.md).
mkdir -p src titles seg
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
F="/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf"; RED="#e1252f"
W=720; H=1560
# 1) bucățile sursă, tăiate direct din originalele 4K (ffmpeg citește doar intervalul cerut)
src() { # nume url start durata (sare peste bucățile deja descărcate)
  [ -f "src/$1.mp4" ] && return 0
  ffmpeg -loglevel error -y -user_agent "$UA" -ss "$3" -t "$4" -i "$2" -an -vf "scale=-2:2160:flags=lanczos" -c:v libx264 -crf 14 -preset fast "src/$1.mp4"; }
src scena-bokeh https://videos.pexels.com/video-files/19197406/19197406-uhd_3840_2160_30fps.mp4 2 4.2
src mixer https://videos.pexels.com/video-files/30921231/13222035_3840_2160_25fps.mp4 6 3.6
src led https://videos.pexels.com/video-files/32336443/13794731_3840_2160_30fps.mp4 0.4 3.6
src lumini https://videos.pexels.com/video-files/39587983/16873754_3840_2160_30fps.mp4 1 3.6
src casti https://videos.pexels.com/video-files/8865644/8865644-hd_1920_1080_25fps.mp4 2 3.6
src camera https://videos.pexels.com/video-files/39402055/16776833_3840_2160_60fps.mp4 0.3 3.6
echo "surse ok"
# 2) titlurile, mai mari decât înainte (cadrul e mai înalt, deci nu se mai taie pe lateral)
mkv() { # nume rosu alb rand1 rand2
  magick -background none -font "$F" -pointsize 170 -kerning 2 -fill "$RED" label:"$2" -trim +repage r.png
  if [ -n "$3" ]; then magick -background none -font "$F" -pointsize 170 -kerning 2 -fill white label:"$3" -trim +repage w.png; magick r.png w.png -background none -gravity center -append -resize '630x>' t.png; else magick r.png -resize '630x>' t.png; fi
  magick -background none -font "$F" -pointsize 50 -kerning 4 -fill "#f2ede7" label:"$4" l1.png
  if [ -n "$5" ]; then magick -background none -font "$F" -pointsize 50 -kerning 4 -fill "#f2ede7" label:"$5" l2.png; magick l1.png l2.png -background none -gravity center -append -resize '640x>' s.png; else magick l1.png -resize '640x>' s.png; fi
  magick t.png \( -size 10x34 xc:none \) s.png -gravity center -background none -append block.png
  magick block.png \( +clone -background black -shadow 70x14+0+6 \) +swap -background none -layers merge +repage block2.png
  magick -size ${W}x${H} xc:none -fill "rgba(0,0,0,0.62)" -draw "ellipse 360,780 360,330 0,360" -blur 0x80 -define png:color-type=6 scrim.png
  magick -size ${W}x${H} xc:none block2.png -gravity center -composite scrim.png -compose DstOver -composite -define png:color-type=6 "titles/$1.png"; }
mkv t0 "SOUND" "MANAGEMENT" "SONORIZĂRI · ECRANE LED" "LUMINI · TRADUCERE SIMULTANĂ"
mkv t1 "SONORIZARE" "" "PENTRU CONFERINȚE" "ȘI EVENIMENTE CORPORATE"
mkv t2 "ECRANE" "LED" "MODULARE, PENTRU SCENĂ" "ȘI CONFERINȚE"
mkv t3 "LUMINI" "DE SCENĂ" "AMBIENT, MOVING HEADS" "ȘI EFECTE SPECIALE"
mkv t4 "TRADUCERE" "SIMULTANĂ" "CABINE, RECEPTOARE, CĂȘTI" ""
mkv t5 "FOTO" "ȘI VIDEO" "FOTOGRAFII ȘI FILMARE" "LA EVENIMENT"
rm -f r.png w.png t.png s.png l1.png l2.png block.png block2.png scrim.png
echo "titluri ok"
# 3) segmentele verticale: decupaj central 720x1560 din 4K (micșorare, nu mărire), aceeași corecție de culoare ca înainte
GV="scale=-2:${H}:flags=lanczos,crop=${W}:${H}:(in_w-${W})*POZ:0,fps=30,setsar=1,eq=contrast=1.1:brightness=-0.05:saturation=1.08,vignette=PI/5,format=yuv420p"
segv() { local fo=$(echo "$3 - 0.8" | bc); local extra="$5"; local poz="${6:-0.5}"  # poz = poziția decupajului (0 stânga, 1 dreapta)
  ffmpeg -loglevel error -y -i "src/$2.mp4" -loop 1 -t "$3" -i "titles/$4.png" -filter_complex \
   "[0:v]${GV/POZ/$poz}${extra}[v];[1:v]format=rgba,fade=t=in:st=0.35:d=0.45:alpha=1,fade=t=out:st=${fo}:d=0.45:alpha=1[t];[v][t]overlay=0:0,format=yuv420p" \
   -t "$3" -an -c:v libx264 -crf 16 -preset fast "seg/s$1.mp4"; }
segv 0 scena-bokeh 4.2 t0
segv 1 mixer 3.6 t1
segv 2 led 3.6 t2 ",eq=brightness=-0.08:saturation=0.85"
segv 3 lumini 3.6 t3 "" 0.64
segv 4 casti 3.6 t4 ",eq=brightness=-0.22:contrast=1.05"
segv 5 camera 3.6 t5
echo "segmente ok"
ffmpeg -loglevel error -y -i seg/s0.mp4 -i seg/s1.mp4 -i seg/s2.mp4 -i seg/s3.mp4 -i seg/s4.mp4 -i seg/s5.mp4 -filter_complex \
"[0][1]xfade=transition=fade:duration=0.5:offset=3.7[a];[a][2]xfade=transition=fade:duration=0.5:offset=6.8[b];[b][3]xfade=transition=fade:duration=0.5:offset=9.9[c];[c][4]xfade=transition=fade:duration=0.5:offset=13.0[d];[d][5]xfade=transition=fade:duration=0.5:offset=16.1[e];[e]fade=t=in:st=0:d=0.4,fade=t=out:st=19.2:d=0.5,format=yuv420p[v]" \
-map "[v]" -an -c:v libx264 -crf 16 -preset fast hero_v_master.mp4
echo "master ok"
