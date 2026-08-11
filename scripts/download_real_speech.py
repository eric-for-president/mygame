import os
import sys
import yt_dlp

audio_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
os.makedirs(audio_dir, exist_ok=True)
output_template = os.path.join(audio_dir, 'madan-bhandari-speech.%(ext)s')

# Search for authentic Madan Bhandari Khulamanch speech
ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': output_template,
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'noplaylist': True,
    'quiet': False,
}

search_query = 'ytsearch1:Madan Bhandari historic speech Khulamanch'
print(f"Downloading authentic audio for query: {search_query}")

try:
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([search_query])
    print("Download completed successfully!")
except Exception as e:
    print(f"Error during download with postprocessor: {e}")
    # Fallback download without FFmpeg postprocessor if ffmpeg not installed
    ydl_opts_fallback = {
        'format': 'bestaudio/best',
        'outtmpl': output_template,
        'noplaylist': True,
        'quiet': False,
    }
    with yt_dlp.YoutubeDL(ydl_opts_fallback) as ydl:
        ydl.download([search_query])
    print("Fallback download completed!")
