from flask import request, jsonify, make_response, Flask, send_file
from PIL import Image, ImageDraw, ImageFont
import os, shutil
from gunicorn import __version__

app = Flask(__name__)

@app.route("/API/upload_file", methods=["POST"])
def API_upload_file():
    recv_file = request.files.get("file")
    if recv_file is None:
        return "", 400
    try:
        recv_file.save(f"app/images/{recv_file.filename}")
    except FileNotFoundError:
        os.mkdir("./app/images/")
        recv_file.save(f"app/images/{recv_file.filename}")
    except FileExistsError:
        return "OK", 200
    return "OK", 200

@app.route("/API/write_text", methods=["POST"])
def API_write_text():
    filename = request.form.get("filename")
    text = request.form.get("text")
    text.replace("\r\n","\n")
    size = int(request.form.get("size"))
    x = int(request.form.get("xpos"))
    y = int(request.form.get("ypos"))
    image = Image.open('./app/images/'+filename)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype('./Roboto-Bold.ttf', size=size)
    color = 'rgb(50, 50, 50)' # black color
    draw.multiline_text((x, y), text, fill=color, font=font)    
    image.save('./app/images/'+filename+'-edited.png')
    return jsonify({
        'filename':(filename+"-edited.png")
        }), 200


@app.route("/<filename>")
def main(filename):
    try:
        return send_file(f"static/{filename}")
    except:
        return "", 404
    


@app.route("/image/<filename>")
def serve_image(filename):
    try:
        return send_file(f"images/{filename}")
    except Exception as e:
        return "",404


@app.route("/API/RemoveAllImages")
def remove_all_images():
    shutil.rmtree("./app/images/")
    return "OK",200


@app.route("/")
def root_directory():
    return send_file("static/main.html")

