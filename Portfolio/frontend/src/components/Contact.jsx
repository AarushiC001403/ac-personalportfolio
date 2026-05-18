import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
/** Sends form details TO you (name, email, message, etc.) */
const notificationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
/** Optional: sends thank-you TO the person who filled the form */
const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const recipientEmail = import.meta.env.VITE_CONTACT_TO_EMAIL;

function getErrorMessage(error) {
  if (typeof error === "object" && error !== null) {
    if ("text" in error && error.text) return String(error.text);
    if ("message" in error && error.message) return String(error.message);
  }
  return "Could not send message. Please try again.";
}

export default function Contact() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (publicKey) {
      emailjs.init({ publicKey });
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please fill in name, email, and message.");
      return;
    }

    if (!serviceId || !notificationTemplateId || !publicKey || !recipientEmail) {
      setStatus(
        "Email is not configured. Add your EmailJS keys to frontend/.env and restart the dev server.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus("Sending your message...");

      // 1) Notify you with the actual form submission
      await emailjs.sendForm(serviceId, notificationTemplateId, form);

      // 2) Optional auto-reply to the visitor (separate template in EmailJS)
      if (autoReplyTemplateId) {
        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          {
            to_email: email,
            name,
            email,
            phone: phone || "Not provided",
            message,
          },
          { publicKey },
        );
      }

      setStatus("Message sent! I will get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      const errorMessage = getErrorMessage(error);

      if (errorMessage.toLowerCase().includes("recipient")) {
        setStatus(
          'Notification template: set "To email" to {{to_email}}. Auto-reply template: set "To email" to {{email}}.',
        );
      } else {
        setStatus(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const emailConfigured = Boolean(
    serviceId && notificationTemplateId && publicKey && recipientEmail,
  );

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="section-inner section-inner--contact">
        <div className="contact-intro">
          <div className="section-rule section-rule--short" aria-hidden />
          <h2 id="contact-heading" className="section-heading">
            Contact
          </h2>
          <p className="contact-lede">
            Would love to hear from you! Whether you have a question, want to
            collaborate on a project, or just want to say hi, feel free to reach
            out using the form below.
          </p>
        </div>

        <form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="to_email" value={recipientEmail || ""} />

          <div className="field-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>
          <div className="field-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="field-row">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field-row field-row--message">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} required />
          </div>
          <div className="contact-form-submit">
            <button
              type="submit"
              className="btn-primary btn-primary--contact"
              disabled={isSubmitting || !emailConfigured}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>

        {!emailConfigured ? (
          <p className="form-status" role="alert">
            EmailJS is not fully configured. Check frontend/.env and restart npm
            run dev.
          </p>
        ) : null}

        {status ? (
          <p className="form-status" role="status">
            {status}
          </p>
        ) : null}
      </div>
    </section>
  );
}
