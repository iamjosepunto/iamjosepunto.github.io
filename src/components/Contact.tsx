import { PROFILE } from "../data/profile";

const Contact = () => {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold mb-12 text-yellow-400">
        Contact
      </h2>

      <div
        className="
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          p-8
        "
      >
        <p className="text-slate-300 mb-8">
          If you would like to discuss a project,
          collaboration or idea, feel free to get
          in touch.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href={PROFILE.socials.email}
            className="
              text-blue-400
              hover:text-yellow-400
            "
          >
            Email
          </a>

          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            className="
              text-blue-400
              hover:text-yellow-400
            "
          >
            GitHub
          </a>

          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="
              text-blue-400
              hover:text-yellow-400
            "
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;