import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = Flask(__name__)
CORS(
    app,
    resources={
        r"/contact": {
            "origins": [
                origin.strip()
                for origin in os.environ.get("ALLOWED_ORIGIN", "*").split(",")
                if origin.strip()
            ],
        }
    },
)


def _required_env(name):
    value = os.environ.get(name, "").strip()
    if not value:
        raise ValueError(f"Missing required environment variable: {name}")
    return value


@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    phone = str(data.get("phone", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Please provide name, email, and message.",
                }
            ),
            400,
        )

    try:
        sg = SendGridAPIClient(_required_env("SENDGRID_API_KEY"))
        from_email = _required_env("CONTACT_FROM_EMAIL")
        to_email = _required_env("CONTACT_TO_EMAIL")
        subject_prefix = os.environ.get("CONTACT_SUBJECT_PREFIX", "Portfolio Message")

        email_message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=f"{subject_prefix} from {name}",
            html_content=f"""
                <h2>New portfolio contact submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone or "Not provided"}</p>
                <p><strong>Message:</strong></p>
                <p>{message}</p>
            """,
            plain_text_content=(
                "New portfolio contact submission\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Phone: {phone or 'Not provided'}\n\n"
                f"Message:\n{message}"
            ),
        )

        sg.send(email_message)

        return jsonify({"success": True, "message": "Message sent successfully."})

    except ValueError as e:
        return jsonify({"success": False, "error": str(e)}), 500
    except Exception as e:
        print(f"Contact email failed: {e}")
        return (
            jsonify(
                {
                    "success": False,
                    "error": "Could not send message right now. Please try again shortly.",
                }
            ),
            500,
        )


if __name__ == "__main__":
    app.run(debug=True)