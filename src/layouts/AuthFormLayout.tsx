import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
  footerButtonLabel: string;
  footerAddress: string;
}
const AuthFormLayout = function ({
  title,
  children,
  footerButtonLabel,
  footerAddress
}: CardWrapperProps) {
  return (
    <Card className="xl:w-1/3">
      <CardHeader className="text-center font-bold text-4xl">{title}</CardHeader>
      <CardContent className="flex justify-center">{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link to={footerAddress}>{footerButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthFormLayout;
