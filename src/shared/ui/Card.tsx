interface CardProps {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

function CardSkeleton() {
  return <div />;
}

function Card({ children, loading, className }: CardProps) {
  if (loading) return <CardSkeleton />;
  return <div className={className}>{children}</div>;
}

export default Card;
