import { motion } from "framer-motion";

interface ServiceProps {
  services: any[];
}

export default function Services({ services }: ServiceProps) {
  return (
    <section id="services" className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold tracking-widest">
            WHAT I OFFER
          </p>
          <h2 className="text-5xl font-bold mt-3">Services I Provide</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0f172a] p-10 rounded-3xl border border-slate-800 hover:border-indigo-500 transition-all group"
            >
              <div className="text-5xl mb-6 text-indigo-500 group-hover:scale-110 transition">
                <i className={service.icon}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
