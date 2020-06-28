from flask import request, jsonify, make_response, Flask, send_file
import os

app = Flask(__name__)


@app.route("/API/UploadFile", methods=["POST"])
def hello():
    f = request.files.get("file")
    if f == None:
        return "", 400
    try:
        f.save(f"./images/{f.filename}")
    except:
        os.mkdir("./images/")
        f.save(f"./images/{f.filename}")
    return "OK", 200


@app.route("/<filename>")
def Main(filename):
    return send_file(f"./static/{filename}")

@app.route("/image/<filename>")
def ServeImage(filename):
    return send_file(f"./images/{filename}")


@app.route("/")
def RootDirectory():
    return send_file("./static/main.html")


if __name__ == "__main__":
    app.run()
