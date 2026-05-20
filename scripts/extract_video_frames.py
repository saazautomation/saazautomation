import os
import cv2

video = r"C:\Users\Hp\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20260520-0041-00.1256553.mp4"
out = r"C:\Users\Hp\.cursor\projects\empty-window\saaz-automation\assets\video-frames"

os.makedirs(out, exist_ok=True)
cap = cv2.VideoCapture(video)
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
picks = [0, int(total * 0.12), int(total * 0.24), int(total * 0.4), int(total * 0.55), int(total * 0.72), max(total - 1, 0)]

written = []
for i, p in enumerate(picks):
    cap.set(cv2.CAP_PROP_POS_FRAMES, p)
    ok, frame = cap.read()
    if not ok:
        continue
    path = os.path.join(out, f"frame_{i:02d}.png")
    cv2.imwrite(path, frame)
    written.append(path)

cap.release()
print("\n".join(written))
