import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";

export function AuthLayout({
  cardTitle,
  cardDescription,
  form,
  footer,
}: {
  cardTitle: React.ReactNode;
  cardDescription: React.ReactNode;
  form: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="grow justify-center flex flex-col items-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary [&_a]:hover:no-underline">
            {footer}
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
