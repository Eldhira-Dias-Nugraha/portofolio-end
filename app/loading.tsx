export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505]">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-accent/20 border-b-accent rounded-full animate-spin [animation-duration:1.5s]"></div>
      </div>
    </div>
  );
}
