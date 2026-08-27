import React from "react";
import Image from "next/image";

export default function ModulesSection() {
  const modules = [
    {
      id: "01",
      title: "The Mindset Reset",
      image: "/images/image_2.png",
      description:
        "Before any system works, the parent has to shift first. We look at how you were raised, what sets you off, and why the old patterns keep showing back up.",
      outcome:
        "You'll walk away knowing exactly what kind of parent you want to be, and understanding that your current patterns are not your fault.",
    },
    {
      id: "02",
      title: "The Home System",
      image: "/images/image_3.png",
      description:
        "This is where your home starts to change. You'll build the routines, rhythms, and structures that run without you managing every little thing, every single day.",
      outcome:
        "Your mornings will feel different within the first week, not because your kids changed overnight, but because the system around them did.",
    },
    {
      id: "03",
      title: "Age-Appropriate Independence",
      image: "/images/image_4.png",
      description:
        "A clear roadmap for every age, 2 to 18. No more guessing what your kid should be handling on their own.",
      outcome:
        "You'll stop doing too much for your kids, and finally know what they're capable of at every age.",
    },
    {
      id: "04",
      title: "Prepared On Purpose",
      image: "/images/image_5.png",
      description:
        "Emergency readiness, safety, money skills, and the real-life basics most grown adults were never taught.",
      outcome:
        "You'll put down that quiet fear that your kids wouldn't be okay without you. They will be.",
    },
    {
      id: "05",
      title: "Raising Future Ready Kids",
      image: "/images/image_6.png",
      description: "The conversations most parents dodge. College. Trades. Entrepreneurship. Creative careers.",
      outcome:
        "Your kid leaves your home with real identity, real direction, and real capability, not just a diploma.",
    },
  ];

  return (
    <section className="section section-dark">
      <div className="container-wide">
        <div className="showcase-image-box">
          <Image
            src="/images/image_1.jpeg"
            alt="Raise Them Ready program overview"
            width={1000}
            height={562}
            className="w-full h-auto block rounded-2xl"
            priority
          />
        </div>
        <h2 className="center">Five modules. One complete system. A home that finally runs itself.</h2>

        <div className="mod-list">
          {modules.map((mod) => (
            <div key={mod.id} className="mod-card has-thumb">
              <div className="mod-media">
                <span className="mod-pill">Module {mod.id}</span>
                <Image
                  className="mod-thumb"
                  src={mod.image}
                  alt={`Module ${mod.id}: ${mod.title}`}
                  width={100}
                  height={130}
                />
              </div>
              <div className="mod-text">
                <h3>{mod.title}</h3>
                <p className="mod-desc">{mod.description}</p>
                <p className="mod-outcome">{mod.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
