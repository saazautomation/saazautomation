from pathlib import Path
from PIL import Image

assets = Path(r"C:\Users\Hp\.cursor\projects\d-code-agentics-saazautomation\assets")
out = Path(r"D:\code\agentics\saazautomation\public\media\reviews")
out.mkdir(parents=True, exist_ok=True)

p1 = assets / "c__Users_Hp_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot_2026-07-12_201155-e3f35564-43a7-40dc-89ed-dfcd721e2474.png"
p2 = assets / "c__Users_Hp_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Screenshot_2026-07-12_195026-bda5400d-0291-4ebc-bc86-e87ae97868e5.png"

img1 = Image.open(p1).convert("RGB")
img2 = Image.open(p2).convert("RGB")
print("img1", img1.size)
print("img2", img2.size)

w1, h1 = img1.size
w2, h2 = img2.size

# Paulina: main face — upper-center of call screenshot
paulina = img1.crop((int(w1 * 0.28), int(h1 * 0.08), int(w1 * 0.72), int(h1 * 0.72)))
# Salman PIP inset: bottom-right of call screenshot
salman_pip = img1.crop((int(w1 * 0.68), int(h1 * 0.55), int(w1 * 0.98), int(h1 * 0.98)))

# 2x2 grid tiles (approx with thin gutters)
gw, gh = int(w2 * 0.01), int(h2 * 0.02)
half_w, half_h = w2 // 2, h2 // 2
salman = img2.crop((gw, gh, half_w - gw, half_h - gh))
get_clients = img2.crop((half_w + gw, gh, w2 - gw, half_h - gh))
shah_zain = img2.crop((half_w + gw, half_h + gh, w2 - gw, h2 - gh))


def save_avatar(im: Image.Image, name: str, face_box=None):
    """Crop to square face region and resize."""
    if face_box:
        im = im.crop(face_box)
    else:
        # center-square crop favoring upper face
        w, h = im.size
        side = min(w, h)
        left = (w - side) // 2
        top = max(0, int(h * 0.08))
        if top + side > h:
            top = h - side
        im = im.crop((left, top, left + side, top + side))
    im = im.resize((256, 256), Image.Resampling.LANCZOS)
    path = out / name
    im.save(path, "JPEG", quality=90)
    print("saved", path, im.size)


save_avatar(paulina, "paulina.jpg")
save_avatar(salman, "salman.jpg")
save_avatar(get_clients, "get-clients.jpg")
save_avatar(shah_zain, "shah-zain.jpg")
# also keep salman from PIP as backup if needed
save_avatar(salman_pip, "salman-alt.jpg")
print("done")
