import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="
        fixed
        bottom-6
        right-6
        z-50

        w-12
        h-12

        rounded-full

        bg-blue-600
        hover:bg-yellow-400
        hover:text-slate-950

        shadow-lg

        transition-all
        duration-300

        cursor-pointer
      "
    >
      ↑
    </button>
  );
};

export default ScrollToTop;