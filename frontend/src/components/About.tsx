
import { motion } from "framer-motion";
import { Award, Heart, Code, Database, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchExperiences, fetchEducation } from "../services/api";
import type { Experience, Education } from "../types";

export default function About() {
  const { t, i18n } = useTranslation();

  const { data: experiences, isLoading: expLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  const { data: education, isLoading: eduLoading } = useQuery({
    queryKey: ["education"],
    queryFn: fetchEducation,
  });

  // Get the correct CV based on language
  const getCVPath = () =>
    i18n.language === "de"
      ? "/cv/CV_Yohannes_Tekle_DE.pdf"
      : "/cv/CV_Yohannes_Tekle_EN.pdf";

  // Get the correct button text based on language
  const getCVButtonText = () =>
    i18n.language === "de" ? "Lebenslauf Herunterladen" : "Download CV";

  if (expLoading || eduLoading) {
    return (
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-96 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  const stats = [
    { icon: Code, label: t("about.featuredProjects"), value: "4" },
    { icon: Database, label: t("about.technicalSkills"), value: "6" },
    { icon: Award, label: t("about.educationQualifications"), value: "2" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            {t("about.title")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Work Experience and Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left column: Work Experience and CV download */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                {t("about.workExperience")}
              </h3>

              {experiences && experiences.length > 0 ? (
                <div className="space-y-4">
                  {experiences.map((exp: Experience) => (
                    <div
                      key={exp.id}
                      className="border-l-4 border-cyan-500 pl-4"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {exp.title}
                      </h4>
                      <p className="text-cyan-600 dark:text-cyan-400">
                        {exp.company}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {exp.start_date} -{" "}
                        {exp.current ? t("about.present") : exp.end_date}
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {i18n.language === "de"
                    ? "Ich bin Junior Full-Stack Web Developer mit einem Hintergrund im Chemieingenieurwesen und einem Diplom in Full-Stack Software Development vom Code Institute. Ich entwickle Webanwendungen mit React, TypeScript, Python und Django und suche meinen beruflichen Einstieg in die Softwareentwicklung."
                    : "I am a Junior Full-Stack Web Developer with a background in Chemical Engineering and a Diploma in Full-Stack Software Development from Code Institute. I build web applications using React, TypeScript, Python, and Django, and I am seeking my first professional opportunity in software development."}
                </p>
              )}
            </div>

            {/* CV download stays in the left column */}
            <div className="pt-2">
              <a
                href={getCVPath()}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <Download size={18} />
                {getCVButtonText()}
              </a>
            </div>
          </motion.div>

          {/* Right column: Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                {t("about.education")}
              </h3>

              <div className="space-y-4">
                {education?.map((edu: Education) => (
                  <div
                    key={edu.id}
                    className="border-l-4 border-cyan-500 pl-4"
                  >
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-cyan-600 dark:text-cyan-400">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {edu.start_year} - {edu.end_year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-5 text-slate-900 dark:text-white">
            {t("about.quickStats")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-xl p-5 text-center"
              >
                <stat.icon className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Passion */}
        <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <Heart className="w-8 h-8 mb-2 text-cyan-700 dark:text-cyan-400" />
          <h3 className="text-xl font-semibold mb-2">
            {t("about.myPassion")}
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            {t("about.passionText")}
          </p>
        </div>
      </div>
    </section>
  );
}
