import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof schema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", data);
      toast.success("Message sent successfully! I'll reply soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0f1c]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-slate-400 mb-12">
          Have a project in mind? Send me a message.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input
            {...register("name")}
            placeholder="Your Name"
            className="w-full p-5 rounded-2xl bg-[#1e2937] border border-slate-700 focus:border-indigo-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-400 text-left">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Your Email"
            className="w-full p-5 rounded-2xl bg-[#1e2937] border border-slate-700 focus:border-indigo-500 outline-none"
          />
          {errors.email && (
            <p className="text-red-400 text-left">{errors.email.message}</p>
          )}

          <textarea
            {...register("message")}
            placeholder="Your Message"
            rows={6}
            className="w-full p-5 rounded-2xl bg-[#1e2937] border border-slate-700 focus:border-indigo-500 outline-none resize-none"
          />
          {errors.message && (
            <p className="text-red-400 text-left">{errors.message.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-semibold text-xl transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
