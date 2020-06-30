from flask import request, jsonify, make_response, Flask, send_file
import os

app = Flask(__name__)


@app.route("/API/UploadFile", methods=["POST"])
def hello():
    recv_file = request.files.get("file")
    if recv_file is None:
        return "", 400
    try:
        recv_file.save(f"./images/{recv_file.filename}")
    except Exception as e:
        os.mkdir("./images/")
        recv_file.save(f"./images/{recv_file.filename}")
    return "OK", 200


@app.route("/<filename>")
def Main(filename):
    return send_file(f"./static/{filename}")


@app.route("/image/<filename>")
def serve_image(filename):
    return send_file(f"./images/{filename}")


@app.route("/")
def root_directory():
    return send_file("./static/main.html")


if __name__ == "__main__":
    app.run()
