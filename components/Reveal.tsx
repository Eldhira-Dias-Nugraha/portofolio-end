import { motion } from 'framer-motion';

export const Reveal = ({ children, width = "fit-content" }: { children: React.ReactNode, width?: "fit-content" | "100%" }) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.25 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, ease: "easeIn" }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--primary)",
          zIndex: 20,
        }}
      />
    </div>
  );
};
