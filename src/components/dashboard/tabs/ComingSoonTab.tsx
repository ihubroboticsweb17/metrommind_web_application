
interface ComingSoonTabProps {
  message: string;
}

const ComingSoonTab = ({ message }: ComingSoonTabProps) => {
  return (
    <div className="h-[200px] flex items-center justify-center border border-white/5 rounded-md bg-black/40 backdrop-blur-sm">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default ComingSoonTab;
