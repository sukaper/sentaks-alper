from flask import request, jsonify, make_response, Flask, send_file
import os

app = Flask(__name__)

@app.route("/API/UploadFile", methods=["POST"])
def hello():
    recv_file = request.files.get("file")
    if recv_file is None:
        return "", 400
    try:
        recv_file.save(f"app/images/{recv_file.filename}")
    except:
        os.mkdir("./app/images/")
        recv_file.save(f"app/images/{recv_file.filename}")
    return "OK", 200


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


@app.route("/")
def root_directory():
    return send_file("static/main.html")

