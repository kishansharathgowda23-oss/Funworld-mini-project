const SectionHeader = ({ eyebrow, title, description }) => (
  <div className="mb-8 max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand.yellow">{eyebrow}</p>
    <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
    <p className="mt-3 text-white/70">{description}</p>
  </div>
);

export default SectionHeader;

