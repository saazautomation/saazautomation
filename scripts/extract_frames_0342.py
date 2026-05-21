import os
import cv2

video = r"C:\Users\Hp\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20260520-0342-03.5308438.mp4"
out = r"assets/video-frames-0342"

os.makedirs(out, exist_ok=True)
cap = cv2.VideoCapture(video)
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
print("frames", total, "fps", fps, "duration", total / fps if fps else 0)

picks = [int(total * i / 12) for i in range(13)]
for i, p in enumerate(picks):
    cap.set(cv2.CAP_PROP_POS_FRAMES, min(p, max(total - 1, 0)))
    ok, frame = cap.read()
    if not ok:
        continue
    path = os.path.join(out, f"frame_{i:02d}.png")
    cv2.imwrite(path, frame)
    print(path)

cap.release()
