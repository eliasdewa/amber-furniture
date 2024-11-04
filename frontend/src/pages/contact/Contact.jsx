import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "4dbcf988-1ad2-49e0-b0bd-8f2f24e87cef");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Your message has been sent successfully!");
      event.target.reset();
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <section className="bg-[#f4e5ec] p-8 mb-8">
        <h2 className="mb-4 text-2xl font-extrabold text-center capitalize">
          Let's Get In Touch
        </h2>
      </section>
      <section className="py-6 flex flex-col md:flex-row justify-center gap-4">
        {/* map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.754524567443!2d38.74993787411285!3d8.994721091065212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b859b702a4711%3A0xc405046f21d0eaec!2sGoffa%20sefer!5e0!3m2!1sen!2set!4v1729002142239!5m2!1sen!2set"
            width={450}
            height={400}
            allowfullscreen=""
            loading="lazy"
            className="rounded-lg hover:shadow-2xl lg:w-auto"
          ></iframe>
        </div>
        {/* message */}
        <div className="w-full">
          <div className="rounded-lg p-8 shadow-xl lg:col-span-3 bg-[#f4e5ec]">
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Username */}
              <div className="grid grid-cols-1">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  required
                  className="w-full max-w-4xl p-2 border rounded"
                />
              </div>
              {/* Email */}
              <div className="grid grid-cols-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full max-w-4xl p-2 border rounded"
                />
              </div>
              {/* Message */}
              <div>
                <textarea
                  type="text"
                  placeholder="Write your message here..."
                  rows="6"
                  name="message"
                  required
                  className="w-full rounded-lg border border-gray-500 p-3 text-sm dark:text-gray-600"
                ></textarea>
              </div>
              {/* Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block text-white w-full rounded-lg bg-primary/80 px-5 py-3 font-medium sm:w-auto hover:bg-primary"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          {/* social media */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 my-2 py-2">
            <h2 className="font-bold text-lg text-center mr-4">
              FIND US HERE
            </h2>
            <div>
              <ul className="flex gap-2 sm:gap-4 justify-center items-center">
                <li>
                  <a
                    href="https://www.facebook.com/ambar-furniture"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <i className="ri-facebook-circle-fill ri-xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.Instagram.com/ambar-furniture"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <i className="ri-instagram-fill ri-xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/ambar-furniture"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <i className="ri-twitter-fill ri-xl"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ambar-furniture.com"
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    <i className="ri-dribbble-line ri-xl"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
