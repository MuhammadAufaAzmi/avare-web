import sys
from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=200):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # if the pixel is near white
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            # Change all white (also shades of whites)
            # pixels to transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

input_img = r"C:\Users\Budiman\.gemini\antigravity\brain\3442811b-2115-4a2f-bcc6-f95c61c77cb3\media__1784014203999.jpg"
output_img = r"C:\Users\Budiman\.gemini\antigravity\scratch\avare-web\public\navbar-logo.png"

try:
    remove_white_bg(input_img, output_img, 235)
except Exception as e:
    print(e)
